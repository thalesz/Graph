import React, { useEffect, useMemo, useState } from 'react';
import 'chart.js';
import { IMediaPondGrupo, IAluno } from './interface';
import { BarElement } from 'chart.js';
import { ColorMap } from './interface';
import GraphLegend from './GraphLegend';
import Loader from '../Loader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Chart, Scatter } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend
)



const GraficoMediasPonderadas: React.FC<{ data?: IMediaPondGrupo }> = ({ data }) => {

  const colorsByGroup: ColorMap = useMemo(() => ({
    g1: 'rgba(255, 99, 132, 0.5)',
    g2: 'rgba(54, 162, 235, 0.5)',
    g3: 'rgba(255, 206, 86, 0.5)',
  }), []);

  const [nomes, setNomes] = useState<string[]>([]);
  const [grupos, setGrupos] = useState<string[]>([]);
  const [medias, setMedias] = useState<string[]>([]);
  const [notasProcessadas, setNotasProcessadas] = useState<Number[][]>([]);
  // const [chartData, setChartData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.mediaPonds) {
        const alunos: IAluno[] = data.alunos;
        const mediasPonds: string[] = data.mediaPonds
        const nomes = alunos.map(aluno => aluno.nome);
        const grupos =alunos.map(aluno => aluno.grupo);

        const notasProcessadas = data.notaAluno.map((aluno) => {
          return aluno;
        });
        

        console.log("Notas Processadas", notasProcessadas)
        // const medias = Object.values(mediasFinais).map(aluno => aluno.mediaFinal);
        setNomes(nomes);
        setGrupos(grupos);
        setMedias(mediasPonds);
        setNotasProcessadas(notasProcessadas)
        // setChecked(false)
        setIsLoading(false)
        
      
        //reorganizarDados(ordem)
        console.log("notassss", medias)
      } else {
        // Lidar com a situação em que não há mediasFinais disponíveis
      }
    };

    fetchData();
  }, [data]);

  const dataI = {
    labels: nomes,
    datasets: [
       {
        label: 'Médias Finais',
        data: medias.map((media, index) => ({ x: index, y: media, label: nomes[index], valor: notasProcessadas[index]})), // Adicione notasProcessadas[index].valor ao dataset
        backgroundColor: grupos.map(grupo => colorsByGroup[grupo]),
        pointStyle: 'circle', // Estilo do ponto (pode ser 'circle', 'cross', 'triangle', etc.)
        radius: 6, // Tamanho do ponto
      },
      
    ],
  };

  const options = {
  scales: {
    x: {
      ticks: {
        display: true,

      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Médias Finais',
        color: 'black',
        font: {
          size: 14
        }
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context:any) {
          const label = context.dataset.data[context.dataIndex].label;
          const media = context.dataset.data[context.dataIndex].y;
          const notas = context.dataset.data[context.dataIndex].valor;

          // Cria uma string vazia para armazenar as notas
          let notasString = "";

          // Itera pelo array de objetos
          const notasStrings = notas.map((nota: { valor: any; }) => {
            // Acessa o valor da propriedade
            const valor = nota.valor;

            // Concatena a string
            return `${valor} | `;
          });

          // Combina as strings em uma única string
          notasString = notasStrings.join("");

          // Remove as chaves e aspas
          notasString = notasString.replace(/{'|'}|"/g, "");

          return `${label}: ${notasString}`; // Exibe nome e média
        },
      },
    },
  },
};




  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className='GraphSpace'>
      {data? (
        <>
          <Scatter data={dataI} options={options} />
          
        </>
        
        
      ):<>
        <div><p>Nenhum dado disponivel</p>
        </div>
      </>}
     
    </div>
  );
};

export default GraficoMediasPonderadas;

