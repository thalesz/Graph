import React, { useEffect } from "react";
import Plot from 'react-plotly.js';
import { IAluno, IMediaPondGrupo } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";
import { BoxThreeGraphAgrupProps } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";

class GraphAlunoMediaPondScatter extends React.Component<BoxThreeGraphAgrupProps & {sort: boolean}> {
    render() {
        const { resultado } = this.props;
        const {sort} =  this.props

        if (resultado === undefined || resultado === null) {
            return <div>No data available.</div>;
        }
        //hook
        const alunosNomes = resultado.alunos.map((aluno: IAluno) => aluno.nome);
        const mediasPonderadas = resultado?.mediaPonds.map((media: string) => parseFloat(media));

        const legendas = alunosNomes?.map((nome: any, index: string | number) => {
            const notas: any = resultado?.notaAluno[index];
            console.log("notas", notas); // Verifica as notas no console

            const notasFormatadas = notas.map((nota: { valor: any; }) => {
                return `${nota.valor}`; // Acessa a propriedade "valor" de cada objeto de nota
            }).join(', ');

            return `${nome}: Notas - ${notasFormatadas}`;
        });

        // Extrair todos os grupos únicos dos alunos
        const gruposUnicos = Array.from(new Set(resultado.alunos.map((aluno: IAluno) => aluno.grupo)));

        // Criar um objeto que mapeia cada grupo único para uma cor diferente
        const coresPorGrupo: { [grupo: string]: string } = {};
        
         gruposUnicos.forEach((grupo:any, index) => {
                coresPorGrupo[grupo] = `hsl(${(360 / gruposUnicos.length) * index}, 70%, 50%)`;
         });

        // Determine a cor de cada aluno com base no grupo
        // const coresDosAlunos = resultado.alunos.map((aluno: IAluno) => coresPorGrupo[aluno.grupo]);

        const traces = gruposUnicos.map((grupo: any, index) => {
            // Filtrar os alunos e suas médias ponderadas pertencentes ao grupo atual
            const filteredAlunosNomes = alunosNomes.filter((_: any, i: number) => resultado.alunos[i].grupo === grupo);
            const filteredMediasPonderadas = mediasPonderadas.filter((_: any, i: number) => resultado.alunos[i].grupo === grupo);
            const filteredLegendas = legendas.filter((_: any, i: number) => resultado.alunos[i].grupo === grupo);
        
            console.log("grupo:", grupo);
            console.log("filteredAlunosNomes:", filteredAlunosNomes);
            console.log("filteredMediasPonderadas:", filteredMediasPonderadas);
            console.log("filteredLegendas:", filteredLegendas);

            
            return {
                x: sort ? filteredAlunosNomes : alunosNomes,
                y: sort ? filteredMediasPonderadas : mediasPonderadas,
                mode: 'markers',
                type: 'scatter',
                name: grupo,
                text: sort ? filteredLegendas : legendas,
                hoverinfo: 'text',
                marker: {
                    color: coresPorGrupo,
                    size:12
                },
                showlegend: sort
            };
        });
        
    
        return (
            <div className="graph-container">
                <Plot
                    data={[
                        // {
                        //     x: alunosNomes,
                        //     y: mediasPonderadas,
                        //     mode:'markers',
                        //     type: 'scatter',
                        //     text: legendas, // Texto de legenda para cada barra
                        //     hoverinfo: 'y+text', // Exibir legenda somente no hover
                        //     marker: {
                        //         color: coresDosAlunos // Atribui cores com base nos grupos
                        //     }
                        // },
                        ...(traces as any) // Usar spread operator para espalhar os traços sem o primeiro traço
                    ]}
                    layout={{ width: 800, height: 700, title: 'Média ponderada por aluno',   legend: {
                        y: 0.5,
                        font: {
                          family: 'Arial, sans-serif',
                          size: 20,
                          color: 'grey',
                        },
                        
                      },
                     }}
                />
            </div>
        );
    }
}

export default GraphAlunoMediaPondScatter;
