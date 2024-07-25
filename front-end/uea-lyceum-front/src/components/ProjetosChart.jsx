import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ProjetosChart = ({ projetos }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (projetos && projetos.length > 0) {
            const dataMap = projetos.reduce((acc, projeto) => {
                // Use new Date() de maneira que não cause problemas de fuso horário
                const date = new Date(projeto.dataInicio + 'T00:00:00');
                const year = date.getFullYear();
                if (!acc[year]) {
                    acc[year] = 1;
                } else {
                    acc[year]++;
                }
                return acc;
            }, {});

            const labels = Object.keys(dataMap).sort();
            const data = Object.values(dataMap);

            const colors = [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
            ];

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
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
                title: {
                    display: true,
                    text: 'Ano de Início',
                    color: 'black',
                }
            },
            y: {
                ticks: {
                    color: 'black',
                },
                title: {
                    display: true,
                    text: 'Quantidade de Projetos',
                    color: 'black',
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