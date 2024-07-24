import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import necessário para evitar problemas com tree-shaking

const ProjetosChart = ({ projetos }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (projetos && projetos.length > 0) {
            const dataMap = projetos.reduce((acc, projeto) => {
                const year = new Date(projeto.dataInicio).getFullYear();
                if (!acc[year]) {
                    acc[year] = 1;
                } else {
                    acc[year]++;
                }
                return acc;
            }, {});

            const labels = Object.keys(dataMap);
            const data = Object.values(dataMap);

            // Define a paleta de cores
            const colors = [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
            ];

            // Mapeia cada ano para uma cor
            const backgroundColors = labels.map((label, index) => colors[index % colors.length]);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Quantidade de Projetos por Ano de Início',
                        data: data,
                        backgroundColor: backgroundColors,
                        borderColor: backgroundColors.map(color => color.replace('70%', '100%')),
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [projetos]);

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Remove a legenda
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black', // Define a cor das fontes no eixo X
                },
                title: {
                    display: true,
                    text: 'Ano de Início',
                    color: 'black', // Define a cor do título do eixo X
                }
            },
            y: {
                ticks: {
                    color: 'black', // Define a cor das fontes no eixo Y
                },
                title: {
                    display: true,
                    text: 'Quantidade de Projetos',
                    color: 'black', // Define a cor do título do eixo Y
                }
            },
        },
    };

    return (
        <div>
            <h2 style={{ color: 'black' }}>Quantidade de Projetos por Ano de Início</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {chartData.labels ? <Bar data={chartData} options={options} /> : <p style={{ color: 'black' }}>Sem dados para mostrar</p>}
            </div>
        </div>
    );
};

export default ProjetosChart;
