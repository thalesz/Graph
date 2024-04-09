import React, { useEffect, useState } from "react";
import ApexCharts from 'apexcharts';
import { ChartDuvPerQuestaoProps, SeriesData, NomePorGrupo } from "./interfaceBoxDuvPerQuestao";

const ChartDuvPerQuestao: React.FC<ChartDuvPerQuestaoProps> = ({ duvidas, questoes, alunos, setClicked, grupos }) => {

    const [nomesPorGrupos, setNomesPorGrupos]= useState<NomePorGrupo[]>([])
    const [series, setSeries] = useState<SeriesData[]>([]); // grupo, quantidade 

    useEffect(() => {
        // const newSeries: SeriesData[] = [];
        const newNomes: NomePorGrupo[]=[]
    
        grupos.forEach(grupo => {
            // const grupoData: number[] = [];
            
            questoes.forEach(questao => {
                // let qtde = 0;
                const nomes: string[] = [];

                
                duvidas.forEach(duvida => {
                    const alunoComDuvida = alunos.find(aluno => aluno._id === duvida.id_aluno);
                    if (duvida.id_questao === questao._id && alunoComDuvida?.grupo === grupo) {
                        // qtde++;
                        nomes.push(alunoComDuvida?.nome || 'Nome não encontrado');

                    }
                });
                
                // grupoData.push(qtde);
                newNomes.push({grupo:grupo, questao:questao._id, nomes:nomes})

            });
    
            // newSeries.push({ grupo: grupo, data: grupoData });
            console.log("newNomes", newNomes)
        });
        setNomesPorGrupos(newNomes);

        // setSeries(newSeries);
        // console.log("newSeries", newSeries)
    }, [duvidas, questoes, alunos, grupos]);



    useEffect(() => {
        const newSeries: SeriesData[] = [];
        // const newNomes: NomePorGrupo[] = [];
    
        // Loop sobre as questões
        questoes.forEach(questao => {
            const grupoData: number[] = [];
    
            // Loop sobre os grupos
            grupos.forEach(grupo => {
                // const nomes: string[] = [];
                // duvidas.forEach(duvida => {
                //     const alunoComDuvida = alunos.find(aluno => aluno._id === duvida.id_aluno);
                //     if (duvida.id_questao === questao._id && alunoComDuvida?.grupo === grupo) {
                //         nomes.push(alunoComDuvida?.nome || 'Nome não encontrado');
                //     }
                // });
    
                // Filtra as dúvidas pelo grupo e pela questão atual
                const qtde = duvidas.filter(duvida => {
                    const alunoComDuvida = alunos.find(aluno => aluno._id === duvida.id_aluno);
                    return duvida.id_questao === questao._id && alunoComDuvida?.grupo === grupo;
                }).length;
    
                // Adiciona a quantidade de dúvidas ao array de dados do grupo
                grupoData.push(qtde);
                // console.log("Grupo", grupo)
                // console.log("questaoid", questao._id)

                // // Adiciona os nomes por grupo e questão
                // newNomes.push({ questao: questao._id, grupo: grupo, nomes: [...nomes] });
            });
    
            // Adiciona os dados da questão ao array de séries
            newSeries.push({ questao: questao.enunciado, data: grupoData });
        });
    
        // Atualiza o estado com as novas séries e nomes por grupo
        setSeries(newSeries);
        // setNomesPorGrupos(newNomes);
        // console.log("newNomes", newNomes);
    }, [duvidas, questoes, alunos, grupos]);
    
    
        
    useEffect(() => {
        const options = {
            series: series,
            chart: {
                type: 'bar',
                height: 350,
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
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10,
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
            xaxis: {
                type: 'text',
                categories: questoes.map(questao => 'Questão: ' + questao.enunciado),
                
            },
            legend: {
                position: 'right',
                offsetY: 40,
                formatter: function(seriesName: any, opts: { w: { globals: { series: { [x: string]: any; }; }; }; seriesIndex: number; }) {
                    return grupos[opts.seriesIndex];
                }
            },
            fill: {
                opacity: 1
            },tooltip: {
                // Ativar o tooltip
                enabled: true,
                // Mostrar o título do eixo x no tooltip
                x: {
                    show: true,
                    // Formatar o valor do eixo x (se necessário)
                    format: 'text'
                },
                // Definir um formatter personalizado para o título do tooltip (nome da série)
                y: {
                    title: {
                        formatter: (seriesName: any) => seriesName
                    }
                },
                // Definir um formatter personalizado para o tooltip
                custom: ({ series, seriesIndex, dataPointIndex, w }: { series: any[]; seriesIndex: number; dataPointIndex: number; w: any; }) => {
                    const grupo = grupos[seriesIndex]; // Obtém o nome do grupo atual
                    const questaoId = questoes[dataPointIndex]._id; // Obtém o ID da questão atual
                    const questaoIdString = questaoId.toString(); // Convertendo questaoId para string
                    const nomesGrupoQuestao = nomesPorGrupos.find(item => item.grupo === grupo && item.questao === questaoIdString);

                    console.log("g", grupo , questaoId, questaoIdString, nomesGrupoQuestao)
                    
                    // Encontra o objeto correspondente ao grupo e à questão atual em nomesPorGrupos
                    // const nomesGrupoQuestao = nomesPorGrupos.find(item => item.grupo === grupo && item.questao === questaoId);
                
                    // Se existirem nomes de alunos para o grupo e a questão atual
                    if (nomesGrupoQuestao && nomesGrupoQuestao.nomes.length > 0) {
                        // Obtém os nomes dos alunos para o grupo e a questão atual
                        const nomesAlunos = nomesGrupoQuestao.nomes;
                
                        // Constrói o conteúdo da tooltip com os nomes dos alunos
                        let tooltipContent = `<div class='custom-tooltip'><strong>${grupo}</strong> - Questão ${questaoId}<br>`;
                        tooltipContent += `Alunos (${nomesAlunos.length}): `;
                        nomesAlunos.forEach(nome => {
                            tooltipContent += `<span>${nome}</span>, `;
                        });
                        tooltipContent = tooltipContent.slice(0, -2);
                        tooltipContent += '</div>';
                
                        return tooltipContent;
                    } else {
                        return ''; // Retorna uma string vazia se não houver dados para exibir
                    }
                }
                
                
            }
            
        };
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render(); // Added to render the chart after initializing

        return () => {
            chart.destroy(); // Cleanup function to destroy the chart on component unmount
        };
    }, [questoes, series]);

    return (
        <>
            <div id="chart"></div>
        </>
    );
};

export default ChartDuvPerQuestao;
