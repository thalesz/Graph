import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { IAluno, IDuvidas, IQuestoes } from '../AgrupMediaPond/interface';
import { duvidaPorQuestao } from './utils';
import { colorsByGroup } from '../AgrupMediaPond/colors';
import { Chart, ChartEvent, ChartTypeRegistry, ActiveElement, ScatterDataPoint, BubbleDataPoint } from 'chart.js';

import { BoxDuvidaRespostaProps } from '../AgrupMediaPond/interface';

const DuvidasPorQuestoesChart: React.FC<BoxDuvidaRespostaProps> = ({ duvidas, questoes, alunos, setClicked}) => {
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
      hoverBackgroundColor: string[];
      hoverBorderColor: string;
      data: number[];
    }[];
    grupos: string[];
    nomesDosAlunosPorQuestao: string[][];
  }>({
    labels: [],
    datasets: [],
    grupos: [],
    nomesDosAlunosPorQuestao: [],
  });




  const handleChartClick = (
    event: ChartEvent,
    elements: ActiveElement[],
    chart: Chart<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown>
  ) => {
    // Check if any elements were clicked
    if (!elements || !elements.length) {
      return;
    }
  
    // Get indices for the clicked bar and dataset
    const tooltipIndex = elements[0].index;
    const datasetIndex = elements[0].datasetIndex;
  
    // Extract question ID from the label
    const questaoId = questoes[tooltipIndex]._id;
    const grupo = data.grupos[datasetIndex];
  
    const alunosDoGrupo = alunos.filter(aluno => aluno.grupo === grupo);
  
    // Extract student names from data
    const studentNames = data.nomesDosAlunosPorQuestao[tooltipIndex];
  
    // Initialize arrays to store alunos com duvidas e suas duvidas
    let alunosComDuvidas: IAluno[] = [];
    let duvidasDosAlunos: IDuvidas[] = [];
  
    // Iterate through student names
    studentNames.forEach(studentName => {
      // Find aluno by name and group
      const aluno = alunosDoGrupo.find(aluno => aluno.nome === studentName);
      if (aluno) {
        // Find duvidas by aluno id and related to the specific question
        const alunoDuvidas = duvidas.filter(duvida => duvida.id_aluno === aluno._id && duvida.id_questao === questaoId);
        if (alunoDuvidas.length > 0) {
          // If aluno has duvidas related to the specific question, add aluno and duvidas to respective arrays
          alunosComDuvidas.push(aluno);
          duvidasDosAlunos.push(...alunoDuvidas);
        }
      }
    });
  
    // Display alunos com duvidas and suas duvidas
    const alunosComDuvidasNomes = alunosComDuvidas.map(aluno => aluno.nome);
    const duvidasDosAlunosTexto = duvidasDosAlunos.map(duvida => duvida.duvida);
  
    setClicked({
      questao: questoes.find(q => q._id === questaoId)?.enunciado || '',
      aluno: alunosComDuvidasNomes,
      grupo: grupo,
      duvida: duvidasDosAlunosTexto
    });
  };
  

  useEffect(() => {
    if (questoes.length > 0 && duvidas.length > 0) {
      const questaoLabels = questoes.map((questao) => `Questão: ${questao.enunciado}`);
      const { contagemDeDuvidasPorQuestao, nomesDosAlunosPorQuestao, gruposDosAlunos } = duvidaPorQuestao(questoes, duvidas, alunos);

      // Cores para representar os grupos
      const groupColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F0', '#F0FF33', '#33F0FF'];

      const datasets = gruposDosAlunos.map((grupo, index) => ({
        label: `Grupo ${grupo}`,
        backgroundColor: Array(nomesDosAlunosPorQuestao.length).fill(colorsByGroup[`g${index % Object.keys(colorsByGroup).length + 1}`]),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: Array(nomesDosAlunosPorQuestao.length).fill("rgba(0,0,0,0.4)"),
        hoverBorderColor: "rgba(0,0,0,1)",
        data: contagemDeDuvidasPorQuestao.map((_, i) => {
            const alunosDaQuestao = nomesDosAlunosPorQuestao[i]; // Obtém os nomes dos alunos para a questão atual
            const alunosDoGrupo = alunosDaQuestao.flat(); // Achatando o array de alunos para a questão atual
            return alunosDoGrupo
                .filter(aluno => alunos.find(a => a.nome === aluno && a.grupo === grupo)) // Filtra os alunos do grupo atual
                .map(aluno => `${aluno} (${grupo})`) // Mapeia o nome do aluno para incluir o grupo
                .length;
        }),
       }));
    
      
      
      setData({
        labels: questaoLabels,
        datasets: datasets,
        grupos: gruposDosAlunos,
        nomesDosAlunosPorQuestao: nomesDosAlunosPorQuestao,
      });
    }
  }, [questoes, duvidas]);

  return (
    <>
      <div className="chart">
      {data && data.labels && data.labels.length > 0 ? (
        
          <Bar
            data={data}
            options={{
              
              maintainAspectRatio: false,
              scales: {
                x: {
                  stacked: true,
                  max:10
                },
                y: {
                  stacked: true,
                  max:10
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const tooltipIndex = context.dataIndex;
                      const datasetIndex = context.datasetIndex;
                      const nomeAlunos = data.nomesDosAlunosPorQuestao[tooltipIndex].flat();
                      const grupo = data.grupos[datasetIndex];
                  
                      // Obtém o grupo correspondente ao conjunto de dados atual
                      const grupoColor = data.datasets[datasetIndex].backgroundColor[0];
                  
                      // Obtém a cor do grupo atual
                      const alunosDoGrupo = alunos.filter(aluno => aluno.grupo === grupo).map(aluno => aluno.nome);
                  
                      // Filtra os alunos do grupo atual
                  
                      // Verifica se o nome dos alunos incluídos no tooltip pertence ao grupo correspondente à cor
                      const alunosDoGrupoNoTooltip = nomeAlunos.filter(aluno => alunosDoGrupo.includes(aluno));
                      // console.log('alunos do dd', alunosDoGrupoNoTooltip)
                      if (alunosDoGrupoNoTooltip.length > 0) {
                        return `${data.datasets[datasetIndex].label} (${alunosDoGrupoNoTooltip.join(', ')})`;
                      } else {
                        return `${data.datasets[datasetIndex].label}`;
                      }
                    }
                  }
                }
              },onClick: handleChartClick
              
            }}
          />
      ) : null}
              </div>

    </>
  );
};

export default DuvidasPorQuestoesChart;
// function setClicked(arg0: {
//   // tooltipIndex: tooltipIndex,
//   // datasetIndex: datasetIndex
//   questao: string | undefined; aluno: string; grupo: string; duvida: string;
// }) {
//   throw new Error('Function not implemented.');
// }

