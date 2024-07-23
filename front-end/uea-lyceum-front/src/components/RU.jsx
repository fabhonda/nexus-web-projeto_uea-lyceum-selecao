import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RU.css'; // Importe o arquivo CSS

const RU = () => {
    const [cardapios, setCardapios] = useState([]);

    useEffect(() => {
        const fetchCardapios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cardapios');
                setCardapios(response.data);
            } catch (error) {
                console.error('Erro ao buscar os cardápios:', error);
            }
        };

        fetchCardapios();
    }, []);

    return (
        <div className="ru-container">
            <h1>Cardápio do Restaurante Universitário</h1>
            <table className="ru-table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Café</th>
                        <th>Almoço</th>
                        <th>Jantar</th>
                        <th>Unidades Disponíveis</th>
                    </tr>
                </thead>
                <tbody>
                    {cardapios.map((cardapio) => (
                        <tr key={cardapio.data}>
                            <td>{cardapio.data}</td>
                            <td>{cardapio.cafe}</td>
                            <td>{cardapio.almoco}</td>
                            <td>{cardapio.jantar}</td>
                            <td>{cardapio.unidadesDisponiveis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RU;