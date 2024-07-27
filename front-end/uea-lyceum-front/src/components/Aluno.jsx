import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Aluno.css';
import logouea from '../../img/uealogo.png'; // Importe a logo

const Aluno = () => {
    const [aluno, setAluno] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        document.body.classList.add('carteirinha-body');
        return () => {
            document.body.classList.remove('carteirinha-body');
        };
    }, []);

    useEffect(() => {
        const fetchAluno = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                console.log(`Fetching data for email: ${email}`);
                if (!email) {
                    console.error('Email not found in localStorage');
                    return;
                }
                const response = await axios.get(`http://localhost:8080/api/estudantes/${email}`);
                console.log('Response:', response.data);
                setAluno(response.data);
            } catch (error) {
                console.error('Erro ao buscar os dados do estudante:', error);
            }
        };

        fetchAluno();
    }, []);

    if (!aluno) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={`carteirinha ${isFlipped ? 'flipped' : ''}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}>
            <div className="carteirinha-inner">
                <div className="carteirinha-front">
                    <div className="carteirinha-header">
                        <h1 className='h1-carteira'>Carteira de Estudante</h1>
                        <img src={logouea} alt="Logo UEA" className="carteirinha-logo" />
                        <div className="foto">Foto</div>
                    </div>
                    <div className="info-container">
                        <div className="info">
                            <p><span className="label">Nome:</span> <span className="value">{aluno.nome}</span></p>
                        </div>
                        <div className="info">
                            <p><span className="label">Curso:</span> <span className="value">{aluno.curso}</span></p>
                        </div>
                        <div className="info">
                            <p><span className="label">Unidade:</span> <span className="value">{aluno.unidade}</span></p>
                        </div>
                        <div className="info">
                            <p><span className="label">Matrícula:</span> <span className="value">{aluno.matricula}</span></p>
                        </div>
                    </div>
                </div>
                <div className="carteirinha-back">
                    <h2 className='h2-carteira'>Verso da Carteirinha</h2>
                    <div className="info-container">
                        <div className="info">
                            <p><span className="label">Código:</span> 495325734673</p>
                        </div>
                        <div className="info">
                            <p><span className="label">Uso:</span> Este cartão é pessoal e intransferível.</p>
                        </div>
                        <div className="info">
                            <p><span className="label">Validade:</span> Válido enquanto matriculado.</p>
                        </div>
                        <div className="info">
                            <p><span className="label">Contato:</span> 123-456-7890</p>
                        </div>
                        <div className="info">
                            <p><span className="label">Endereço:</span> Rua Exemplo, 123, Cidade, Estado</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aluno;