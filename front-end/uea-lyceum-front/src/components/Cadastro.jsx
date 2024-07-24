import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Importa o CSS

const Cadastro = () => {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [emailPrefix, setEmailPrefix] = useState(''); // Apenas a parte inicial do email
    const [senha, setSenha] = useState('');
    const [curso, setCurso] = useState('');
    const [unidade, setUnidade] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('cadastro-page-body');
        return () => {
            document.body.classList.remove('cadastro-page-body');
        };
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (matricula.length !== 10 || !/^\d+$/.test(matricula)) {
            newErrors.matricula = 'A matrícula deve ter 10 caracteres e ser composta apenas por números.';
        }
        if (/\d/.test(nome)) {
            newErrors.nome = 'O nome não pode conter números.';
        }
        if (!emailPrefix) {
            newErrors.emailPrefix = 'O email é obrigatório.';
        }
        if (!senha) {
            newErrors.senha = 'A senha é obrigatória.';
        }
        if (!curso) {
            newErrors.curso = 'O curso é obrigatório.';
        }
        if (!unidade) {
            newErrors.unidade = 'A unidade é obrigatória.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const email = `${emailPrefix}@uea.edu.br`; // Concatena o prefixo com o domínio
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
            setMessage('Cadastro realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar estudante:', error);
            setMessage('Erro ao cadastrar estudante. Tente novamente.');
        }
    };

    const handlePopupClose = () => {
        setIsSuccess(false); // Fecha o pop-up
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div className="main-container">
            <div className="cadastro-container">
                <div className="cadastro-box">
                    <h2 className="cadastro-text">Cadastro de Estudante</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={`form-group ${errors.matricula ? 'error' : ''}`}>
                            <label htmlFor="matricula" className="text-input">Matrícula</label>
                            <input id="matricula" type="text" placeholder="Informe sua matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
                            {errors.matricula && <span className="error-message">{errors.matricula}</span>}
                        </div>
                        <div className={`form-group ${errors.nome ? 'error' : ''}`}>
                            <label htmlFor="nome" className="text-input">Nome</label>
                            <input id="nome" type="text" placeholder="Informe seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            {errors.nome && <span className="error-message">{errors.nome}</span>}
                        </div>
                        <div className={`form-group ${errors.emailPrefix ? 'error' : ''}`}>
                            <label htmlFor="emailPrefix" className="text-input">Email</label>
                            <div className="email-input-container">
                                <input id="emailPrefix" type="text" placeholder="Seu email UEA" value={emailPrefix} onChange={(e) => setEmailPrefix(e.target.value)} required />
                                <span className="email-domain">@uea.edu.br</span>
                            </div>
                            {errors.emailPrefix && <span className="error-message">{errors.emailPrefix}</span>}
                        </div>
                        <div className={`form-group ${errors.senha ? 'error' : ''}`}>
                            <label htmlFor="senha" className="text-input">Senha</label>
                            <input id="senha" type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                            {errors.senha && <span className="error-message">{errors.senha}</span>}
                        </div>
                        <div className={`form-group ${errors.curso ? 'error' : ''}`}>
                            <label htmlFor="curso" className="text-input">Curso</label>
                            <select id="curso" value={curso} onChange={(e) => setCurso(e.target.value)} required>
                                <option value="" disabled>Selecione um curso</option>
                                <option value="Licenciatura em Computação">Licenciatura em Computação</option>
                                <option value="Sistemas de Informação">Sistemas de Informação</option>
                                <option value="Engenharia de Computação">Engenharia de Computação</option>
                                <option value="Outro">Outro</option>
                            </select>
                            {errors.curso && <span className="error-message">{errors.curso}</span>}
                        </div>
                        <div className={`form-group ${errors.unidade ? 'error' : ''}`}>
                            <label htmlFor="unidade" className="text-input">Unidade</label>
                            <select id="unidade" value={unidade} onChange={(e) => setUnidade(e.target.value)} required>
                                <option value="" disabled>Selecione uma unidade</option>
                                <option value="Escola Superior de Tecnologia (EST)">Escola Superior de Tecnologia (EST)</option>
                                <option value="Escola Normal Superior (ENS)">Escola Normal Superior (ENS)</option>
                                <option value="Escola Superior de Artes e Turismo (ESAT)">Escola Superior de Artes e Turismo (ESAT)</option>
                                <option value="Outra">Outra</option>
                            </select>
                            {errors.unidade && <span className="error-message">{errors.unidade}</span>}
                        </div>
                        <button type="submit" className="cadastro-button">Cadastrar</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                    {isSuccess && (
                        <div className="popup">
                            <div className="popup-content">
                                <p>{message}</p>
                                <button onClick={handlePopupClose}>Ok</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cadastro;