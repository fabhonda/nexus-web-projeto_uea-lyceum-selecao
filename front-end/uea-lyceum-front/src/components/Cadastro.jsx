import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Importa o CSS

const Cadastro = () => {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [curso, setCurso] = useState('');
    const [unidade, setUnidade] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/estudantes', {
                matricula,
                nome,
                email,
                senha,
                curso,
                unidade,
            });
            console.log('Estudante cadastrado com sucesso:', response.data);
            setIsSuccess(true); // Exibe o pop-up de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar estudante:', error);
        }
    };

    const handlePopupClose = () => {
        setIsSuccess(false); // Fecha o pop-up
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div>
            <h2>Cadastro de Estudante</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Matrícula:</label>
                    <input
                        type="text"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Curso:</label>
                    <input
                        type="text"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Unidade:</label>
                    <input
                        type="text"
                        value={unidade}
                        onChange={(e) => setUnidade(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            {isSuccess && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Cadastro realizado com sucesso!</p>
                        <button onClick={handlePopupClose}>Ok</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cadastro;