import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Biblioteca.css'; // Importe o arquivo CSS

const Biblioteca = () => {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/livros');
                setLivros(response.data);
            } catch (error) {
                console.error('Erro ao buscar os livros:', error);
            }
        };

        fetchLivros();
    }, []);

    return (
        <div className="biblioteca-container">
            <h1>Biblioteca</h1>
            <table className="biblioteca-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Cópias</th>
                        <th>Disponibilidade</th>
                        <th>Unidades Disponíveis</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <tr key={livro.id}>
                            <td>{livro.id}</td>
                            <td>{livro.titulo}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.copias}</td>
                            <td>{livro.disponibilidade ? 'Disponível' : 'Indisponível'}</td>
                            <td>{livro.unidadesDisponiveis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Biblioteca;