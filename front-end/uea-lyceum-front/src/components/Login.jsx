// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;