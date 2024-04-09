import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { IMediaPondGrupo } from '../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao';

const GraphAlunoMediaPond: React.FC<{ resultado: IMediaPondGrupo }> = ({ resultado }) => {
    const colors = ['#008FFB'];

    useEffect(() => {
        if (!resultado || !resultado.mediaPonds) {
            return; // Não faz nada se resultado ou resultado.mediaPonds forem undefined
        }

        // Função para renderizar o gráfico
        const renderChart = () => {
            const options = {
                series: [{
                    data: resultado.mediaPonds.map((mediaPond, index) => ({
                        x: resultado.alunos[index].nome,
                        y: parseFloat(mediaPond), // Converte para número
                        notas: resultado.notaAluno[index] // Adiciona as notas como propriedade
                    }))
                }],
                chart: {
                    height: 350,
                    type: 'bar',
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                colors: colors,
                plotOptions: {
                    bar: {
                        columnWidth: '50%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: resultado.alunos.map(aluno => aluno.nome),
                    labels: {
                        style: {
                            colors: "black",
                            fontSize: '12px'
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    x: {
                        show: true,
                        format: 'text'
                    },
                    y: {
                        title: {
                            formatter: (seriesName: any) => seriesName
                        }
                    },
                    custom: function ({ series, seriesIndex, dataPointIndex, w }: { series: any[]; seriesIndex: number; dataPointIndex: number; w: any; }) {
                        const label = resultado.alunos[dataPointIndex].nome;
                        const notas: any = resultado.notaAluno[dataPointIndex];
                        console.log("notas", notas); // Verifica as notas no console

                        const notasFormatadas = notas.map((nota: { valor: any; }) => {
                            return `${nota.valor}`; // Acessa a propriedade "valor" de cada objeto de nota
                        }).join(', ');

                        return `${label}: Notas - ${notasFormatadas}`;
                    }
                },
                toolbar: {
                    show: true,
                    offsetX: 150,
                    offsetY: 150,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                        customIcons: []
                    },
                    export: {
                        csv: {
                            filename: 'chart-data',
                            columnDelimiter: ',',
                            headerCategory: 'Aluno',
                            headerValue: 'Nota',
                            dateFormatter(timestamp:any) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: 'chart-svg'
                        },
                        png: {
                            filename: 'chart-png'
                        }
                    },
                    autoSelected: 'zoom'
                }
            };

            const chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        };

        // Renderiza o gráfico após um pequeno atraso
        setTimeout(renderChart, 100);

        // Cleanup
        return () => {
            const chartElement = document.querySelector("#chart");
            if (chartElement) {
                chartElement.innerHTML = ''; // Limpa o conteúdo do contêiner do gráfico ao desmontar o componente
            }
        };
    }, [resultado]);

    return <div id="chart" style={{ position: 'relative', width: '100%', height: '100%', backgroundColor:'white', color:"black"}}></div>;
}

export default GraphAlunoMediaPond;
