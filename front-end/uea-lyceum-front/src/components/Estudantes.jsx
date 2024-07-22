import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Estudantes = () => {
    const [estudantes, setEstudantes] = useState([]);

    useEffect(() => {
        const fetchEstudantes = async () => {
            try {
                const response = await api.get('/estudantes');
                setEstudantes(response.data);
            } catch (error) {
                console.error('Houve um erro ao buscar os estudantes! ➜ ', error);
            }
        };

        fetchEstudantes();
    }, []);

    return (
        <div>
            <h1>Estudantes</h1>
            {estudantes.length > 0 ? (
                <ul>
                    {estudantes.map((estudante) => (
                        <li key={estudante.matricula}>
                            <p>Matricula: {estudante.matricula}</p>
                            <p>Nome: {estudante.nome}</p>
                            <p>Email: {estudante.email}</p>
                            <p>Unidade: {estudante.unidade}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum estudante encontrado.</p>
            )}
        </div>
    );
};

export default Estudantes;