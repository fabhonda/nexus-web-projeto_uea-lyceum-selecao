import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjetosChart from './ProjetosChart'; // Importe o componente do gráfico
import './PesquisaExtensao.css'; // Importe o arquivo CSS
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PesquisaExtensao = () => {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [forPDF, setForPDF] = useState(false);

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
                const response = await axios.get('http://localhost:8080/api/projetos');
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

    const downloadPDF = async () => {
        if (!user) return;

        setForPDF(true); // Defina forPDF como true

        setTimeout(async () => {
            const doc = new jsPDF();

            // Adiciona nome, email e matrícula
            doc.text(`Nome: ${user.nome}`, 10, 10);
            doc.text(`Email: ${user.email}`, 10, 20);
            doc.text(`Matrícula: ${user.matricula}`, 10, 30);

            // Adiciona lista de projetos
            let yPosition = 40;
            doc.text('Projetos:', 10, yPosition);
            projetos.forEach((projeto, index) => {
                yPosition += 10;
                doc.text(`${index + 1}. ${projeto.titulo}`, 10, yPosition);
            });

            // Captura e adiciona o gráfico
            const graphElement = document.getElementById('graph');
            const canvas = await html2canvas(graphElement);
            const imgData = canvas.toDataURL('image/png');
            
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth() - 20;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            doc.addImage(imgData, 'PNG', 10, yPosition + 10, pdfWidth, pdfHeight);

            doc.save('relatorio.pdf');

            setForPDF(false); // Defina forPDF como false novamente
        }, 1000); // Tempo para re-renderizar o componente com a nova prop
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao buscar os dados dos projetos: {error}</p>;

    return (
        <div className="pesquisa-extensao-container">
            <h1 className="pesquisa-extensao-title">Projetos de Pesquisa e Extensão</h1>
            <button onClick={downloadPDF} style={{ float: 'right', marginBottom: '10px' }}>
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
                    </tr>
                </thead>
                <tbody>
                    {projetos.map((projeto) => (
                        <tr key={projeto.id}>
                            <td className="col-id">{projeto.id}</td>
                            <td className="col-titulo">{projeto.titulo}</td>
                            <td className="col-descricao">{projeto.descricao}</td>
                            <td className="col-data">{new Date(projeto.dataInicio).toLocaleDateString()}</td>
                            <td className="col-data">{new Date(projeto.dataFim).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="chart-container" id="graph">
                <ProjetosChart projetos={projetos} forPDF={forPDF} /> {/* Passar dados dos projetos e indicador para PDF como props */}
            </div>
        </div>
    );
};

export default PesquisaExtensao;