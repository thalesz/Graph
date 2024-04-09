import React from 'react';
import Plot from 'react-plotly.js';
import { IMediaPondGrupo, IAluno } from '../AgrupMediaPond/interface';
import Card from 'react-bootstrap/esm/Card';

interface Graph02Props {
  resultado: IMediaPondGrupo | undefined
}

class Graph02 extends React.Component<Graph02Props> {
  render() {
    const { resultado } = this.props; // Recebendo props

    // Verifica se há resultado disponível
    if (!resultado) {
      return <div>Dados não disponíveis.</div>;
    }

    // Extrai os nomes dos alunos, as médias ponderadas e as notas de cada aluno
    const alunosNomes = resultado.alunos.map((aluno: IAluno) => aluno.nome);
    const mediasPonderadas = resultado.mediaPonds.map(media => parseFloat(media));

    // Define o texto de legenda para cada barra
    const legendas = alunosNomes.map((nome, index) => {
      const notas: any = resultado.notaAluno[index];
      console.log("notas", notas); // Verifica as notas no console

      const notasFormatadas = notas.map((nota: { valor: any; }) => {
          return `${nota.valor}`; // Acessa a propriedade "valor" de cada objeto de nota
      }).join(', ');

      return `${nome}: Notas - ${notasFormatadas}`;
    });


    return (  
      <Card body 
            bg={"secondary"}
            text={"white"}
            className="mb-2 Box2"
          >
            <div className="graph-container">
                <Plot
                  data={[ 
                    {
                      x: alunosNomes,
                      y: mediasPonderadas,
                      type: 'bar',
                      text: legendas, // Texto de legenda para cada barra
                      hoverinfo: 'y+text', // Exibir legenda somente no hover
                    }
                  ]}
                  layout={{ width: 800, height: 600, title: 'Média ponderada por aluno' }}
                />
          </div>
        </Card>
          
    );
  }
}

export default Graph02;
