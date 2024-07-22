import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Aluno.css';

const Aluno = () => {
    const [aluno, setAluno] = useState(null);

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
        <div className="carteirinha">
            <h1>Carteira de Estudante</h1>
            <div className="info-container">
                <div className="info">
                    <p>Nome: {aluno.nome}</p>
                    <p>Curso: {aluno.curso}</p>
                    <p>Unidade: {aluno.unidade}</p>
                </div>
                <div className="carteirinha-logo-foto">
                    <div className="carteirinha-logo">Logo</div>
                    <div className="carteirinha-foto">Foto</div>
                </div>
            </div>
            <div className="matricula-container">
                <p className="matricula">Matrícula: {aluno.matricula}</p>
            </div>
        </div>
    );
};

export default Aluno;