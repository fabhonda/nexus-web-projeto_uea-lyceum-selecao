import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjetosChart from './ProjetosChart';
import './PesquisaExtensao.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaTrash, FaPlus, FaPencilAlt, FaCheck } from 'react-icons/fa';

const PesquisaExtensao = () => {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [forPDF, setForPDF] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [novoProjeto, setNovoProjeto] = useState({
        titulo: 'Novo Projeto',
        descricao: 'Descrição do Projeto',
        dataInicio: '',
        dataFim: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                if (!email) {
                    console.error('Email not found in localStorage');
                    return;
                }
                const response = await axios.get(`http://localhost:8080/api/estudantes/${email}`);
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar os dados do estudante:', error);
            }
        };

        const fetchProjetos = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                if (!email) {
                    console.error('Email not found in localStorage');
                    return;
                }
                const response = await axios.get(`http://localhost:8080/api/projetos/${email}`);
                setProjetos(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUser();
        fetchProjetos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoProjeto({ ...novoProjeto, [name]: value });
    };

    const addProjeto = async () => {
        if (!user) return;

        if (!novoProjeto.dataInicio) {
            alert('A data de início não pode ser vazia');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/projetos/${user.email}`, {
                titulo: novoProjeto.titulo || 'Novo Projeto',
                descricao: novoProjeto.descricao || 'Descrição do Projeto',
                dataInicio: novoProjeto.dataInicio,
                dataFim: novoProjeto.dataFim,
            });
            setProjetos([...projetos, response.data]);
            setNovoProjeto({
                titulo: 'Novo Projeto',
                descricao: 'Descrição do Projeto',
                dataInicio: '',
                dataFim: '',
            });
        } catch (error) {
            console.error('Erro ao adicionar o projeto:', error);
        }
    };

    const deleteProjeto = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/projetos/${id}`);
            setProjetos(projetos.filter((projeto) => projeto.id !== id));
        } catch (error) {
            console.error('Erro ao deletar o projeto:', error);
        }
    };

    const downloadPDF = async () => {
        if (!user) return;

        setForPDF(true);

        setTimeout(async () => {
            const doc = new jsPDF();

            doc.text(`Nome: ${user.nome}`, 10, 10);
            doc.text(`Email: ${user.email}`, 10, 20);
            doc.text(`Matrícula: ${user.matricula}`, 10, 30);

            let yPosition = 40;
            doc.text('Projetos:', 10, yPosition);
            projetos.forEach((projeto, index) => {
                yPosition += 10;
                doc.text(`${index + 1}. ${projeto.titulo}`, 10, yPosition);
            });

            const graphElement = document.getElementById('graph');
            const canvas = await html2canvas(graphElement);
            const imgData = canvas.toDataURL('image/png');
            
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth() - 20;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            doc.addImage(imgData, 'PNG', 10, yPosition + 10, pdfWidth, pdfHeight);

            doc.save('relatorio.pdf');

            setForPDF(false);
        }, 1000);
    };

    const handleEdit = (id) => {
        setEditMode(id);
    };

    const handleSave = async (id) => {
        const projeto = projetos.find(projeto => projeto.id === id);
        try {
            await axios.put(`http://localhost:8080/api/projetos/${id}`, projeto);
            setEditMode(null);
        } catch (error) {
            console.error('Erro ao atualizar o projeto:', error);
        }
    };

    const handleCellEdit = (e, id, field) => {
        const { value } = e.target;
        setProjetos(projetos.map(projeto => 
            projeto.id === id ? { ...projeto, [field]: value } : projeto
        ));
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao buscar os dados dos projetos: {error}</p>;

    return (
        <div className="pesquisa-extensao-body">
            <div className="pesquisa-extensao-container">
                <h1 className="pesquisa-extensao-title">Projetos de Pesquisa e Extensão</h1>
                <button className="download-button-pdf" onClick={downloadPDF} style={{ float: 'right', marginBottom: '10px' }}>
                    Baixar Relatório PDF
                </button>
                <table className="pesquisa-extensao-table">
                    <thead>
                        <tr>
                            <th className="col-id">ID</th>
                            <th className="col-titulo">Título</th>
                            <th className="col-descricao">Descrição</th>
                            <th className="col-data">Data de Início</th>
                            <th className="col-data">Data de Fim</th>
                            <th className="col-acao">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projetos.map((projeto, index) => (
                            <tr key={projeto.id}>
                                <td className="col-id">{index + 1}</td>
                                <td className="col-titulo">
                                    {editMode === projeto.id ? (
                                        <input
                                            type="text"
                                            value={projeto.titulo}
                                            onChange={(e) => handleCellEdit(e, projeto.id, 'titulo')}
                                            className="edit-input"
                                        />
                                    ) : (
                                        projeto.titulo
                                    )}
                                </td>
                                <td className="col-descricao">
                                    {editMode === projeto.id ? (
                                        <input
                                            type="text"
                                            value={projeto.descricao}
                                            onChange={(e) => handleCellEdit(e, projeto.id, 'descricao')}
                                            className="edit-input"
                                        />
                                    ) : (
                                        projeto.descricao
                                    )}
                                </td>
                                <td className="col-data">
                                    {editMode === projeto.id ? (
                                        <input
                                            type="date"
                                            value={projeto.dataInicio ? projeto.dataInicio.split('T')[0] : ''}
                                            onChange={(e) => handleCellEdit(e, projeto.id, 'dataInicio')}
                                            className="edit-input"
                                        />
                                    ) : (
                                        projeto.dataInicio ? projeto.dataInicio.split('T')[0] : ''
                                    )}
                                </td>
                                <td className="col-data">
                                    {editMode === projeto.id ? (
                                        <input
                                            type="date"
                                            value={projeto.dataFim ? projeto.dataFim.split('T')[0] : ''}
                                            onChange={(e) => handleCellEdit(e, projeto.id, 'dataFim')}
                                            className="edit-input"
                                        />
                                    ) : (
                                        projeto.dataFim ? projeto.dataFim.split('T')[0] : ''
                                    )}
                                </td>
                                <td className="col-acao">
                                    <div className="icon-container">
                                        {editMode === projeto.id ? (
                                            <button onClick={() => handleSave(projeto.id)} className="icon-button" style={{ color: 'green' }}><FaCheck /></button>
                                        ) : (
                                            <button onClick={() => handleEdit(projeto.id)} className="icon-button" style={{ color: 'blue' }}><FaPencilAlt /></button>
                                        )}
                                        <button onClick={() => deleteProjeto(projeto.id)} className="icon-button" style={{ color: 'red' }}><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="col-id">Novo</td>
                            <td className="col-titulo">
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleInputChange({ target: { name: 'titulo', value: e.target.innerText } })}
                                >
                                    {novoProjeto.titulo}
                                </div>
                            </td>
                            <td className="col-descricao">
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleInputChange({ target: { name: 'descricao', value: e.target.innerText } })}
                                >
                                    {novoProjeto.descricao}
                                </div>
                            </td>
                            <td className="col-data">
                                <input
                                    type="date"
                                    name="dataInicio"
                                    value={novoProjeto.dataInicio}
                                    onChange={handleInputChange}
                                    className="date-input"
                                />
                            </td>
                            <td className="col-data">
                                <input
                                    type="date"
                                    name="dataFim"
                                    value={novoProjeto.dataFim}
                                    onChange={handleInputChange}
                                    className="date-input"
                                />
                            </td>
                            <td className="col-acao">
                                <button onClick={addProjeto} style={{ color: 'blue' }}><FaPlus /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="chart-container" id="graph">
                    <ProjetosChart projetos={projetos} forPDF={forPDF} />
                </div>
            </div>
        </div>
    );
};

export default PesquisaExtensao;