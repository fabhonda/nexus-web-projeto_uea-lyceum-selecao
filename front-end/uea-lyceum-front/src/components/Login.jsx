import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('login-page-body');
        return () => {
            document.body.classList.remove('login-page-body');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, senha });
            setMessage(response.data);
            localStorage.setItem('userEmail', email); // Armazena o email no localStorage
            console.log('Email stored in localStorage:', email); // Log para verificar o armazenamento
            navigate('/landing'); // Redireciona para a landing page após o login bem-sucedido
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data);
            } else if (error.request) {
                setMessage('No response received from the server.');
            } else {
                setMessage('Error: ' + error.message);
            }
        }
    };

    return (
        <div className="main-container">
            <div className="login-container">
                <div className="login-box">
                    <h2 className="login-text">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="text-input">Email</label>
                            <input id="email" type="email" placeholder='Informe seu e-mail da UEA' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha" className="text-input">Senha</label>
                            <input id="senha" type="password" placeholder='Digite sua senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </div>
                        <button type="submit" className="login-button">Entrar</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;