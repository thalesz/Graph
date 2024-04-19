import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { ChartDuvPerQuestaoProps, IQuestoes, IDuvidas, IAluno } from './interfaceBoxDuvPerQuestao';

const Graph03: React.FC<ChartDuvPerQuestaoProps> = ({ duvidas, questoes, alunos, setClicked, grupos }) => {
  const [data, setData] = useState<any[]>([]); // Array para armazenar os dados do gráfico

  useEffect(() => {
    // Função para calcular a quantidade de dúvidas por grupo para cada questão
    const calcularDuvidasPorGrupo = () => {
      const newData: any[] = [];
    
      grupos.forEach((grupo: any) => {
        const nomeGrupo = grupo;
        const duvidasPorGrupo: number[] = Array(questoes.length).fill(0); // Inicializa o array com zeros para cada grupo
        const nomesAlunosPorGrupo: string[][] = Array(questoes.length).fill([]); // Array para armazenar os nomes dos alunos com dúvidas por grupo
    
        questoes.forEach((questao: any, index: number) => {
          const alunosComDuvidas: string[] = []; // Array para armazenar os nomes dos alunos com dúvidas nesta questão
    
          duvidas.forEach((duvida: any) => {
            const alunoComDuvida = alunos.find((aluno: any) => aluno._id === duvida.id_aluno && aluno.grupo === grupo);
            if (duvida.id_questao === questao._id && alunoComDuvida) {
              duvidasPorGrupo[index]++; // Incrementa a contagem de dúvidas para a questão atual se ela pertencer ao grupo
              alunosComDuvidas.push(alunoComDuvida.nome); // Adiciona o nome do aluno com dúvida ao array
            }
          });
    
          nomesAlunosPorGrupo[index] = alunosComDuvidas; // Define os nomes dos alunos com dúvidas para esta questão
        });
    
        newData.push({
          x: questoes.map((questao: any) => questao.enunciado), // Enunciados das questões
          y: duvidasPorGrupo, // Quantidade de dúvidas por grupo
          name: nomeGrupo, // Nome do grupo
          type: 'bar',
          text: nomesAlunosPorGrupo.map((nomes, index) => nomes.join(', ')) // Usa os nomes dos alunos com dúvidas como texto para cada item
        });
      });
    
      setData(newData);
    };
    

    calcularDuvidasPorGrupo();
  }, [duvidas, questoes, alunos, grupos]);

  return (
    <Plot

      className='GraphDuvida'
      data={data}
      layout={{
        barmode: 'stack',
        legend: { traceorder: 'normal' }, // Define a ordem das legendas como "normal",
        width: 800, height: 700, title: 'Dúvidas por Questão'
      }}
    />
  );
};

export default Graph03;
