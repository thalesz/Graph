import Card from 'react-bootstrap/Card'
import HeaderBts from '../DuvidaPorQuestaoBTS/HeaderBts';
import { IMediaPondGrupo, TableListAlunoSelectProps } from '../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao';
import { useEffect, useState } from 'react';
import TableListAlunoSelect from './TableListAlunoSelec';
import UtilAgrupMediaPond from '../AgrupMediaPond/UtilAgrupMediaPond';

const BoxListAlunoSelect: React.FC<TableListAlunoSelectProps> = ({resultado, alunosMarcados, setAlunosMarcados})=>{


    const [textInput, setTextInput] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [resultadoFiltrado, setResultadoFiltrado] = useState<IMediaPondGrupo | undefined>(undefined);
  



  useEffect(()=>{
    console.log("alunos marcados", alunosMarcados);
  },[alunosMarcados])

  
    useEffect(()=>{
        if (resultado) {
            // Filtrar os alunos com base no nome digitado
            const alunosFiltrados = resultado.alunos.filter((aluno: { nome: string; }) =>
              aluno.nome.toLowerCase().includes(textInput.toLowerCase())
            );
      
            // Atualizar o estado com o resultado filtrado
            setResultadoFiltrado({
              ...resultado,
              alunos: alunosFiltrados,
            });
          }
    },[textInput, resultado])

    useEffect(() => {
        const ordenarPor = (value: string) => {
          if (value === 'n') {
            // Ordenar por nome
            const alunosOrdenadosPorNome = resultado?.alunos.slice().sort((a: { nome: string }, b: { nome: string }) => a.nome.localeCompare(b.nome));
      
            // Ordenar mediaPonds e notaAluno de acordo com a ordem dos alunos
            const indicesOrdenadosPorNome = alunosOrdenadosPorNome?.map((aluno: { nome: string }) => resultado.alunos.indexOf(aluno));
            const mediaPondsOrdenadas = indicesOrdenadosPorNome?.map((index: number) => (resultado.mediaPonds && resultado.mediaPonds[index]) || "");
            const notaAlunoOrdenada = indicesOrdenadosPorNome?.map((index: number) => (resultado.notaAluno && resultado.notaAluno[index]) || []);
      
            setResultadoFiltrado({
              ...resultado,
              alunos: alunosOrdenadosPorNome || [],
              mediaPonds: mediaPondsOrdenadas || [],
              notaAluno: notaAlunoOrdenada || [],
            });
          } else if (value === 'v') {
            // Ordenar por valor da média ponderada usando mediaPonds
            const alunosOrdenadosPorMedia = resultado?.alunos.slice().sort((a: { nome: string }, b: { nome: string }) => {
              const mediaA = resultado.mediaPonds[resultado.alunos.indexOf(a)] || "";
              const mediaB = resultado.mediaPonds[resultado.alunos.indexOf(b)] || "";
              return parseFloat(mediaB) - parseFloat(mediaA);
            });
      
            // Ordenar mediaPonds e notaAluno de acordo com a ordem dos alunos
            const indicesOrdenadosPorMedia = alunosOrdenadosPorMedia?.map((aluno: { nome: string }) => resultado.alunos.indexOf(aluno));
            const mediaPondsOrdenadas = indicesOrdenadosPorMedia?.map((index: number) => (resultado.mediaPonds && resultado.mediaPonds[index]) || "");
            const notaAlunoOrdenada = indicesOrdenadosPorMedia?.map((index: number) => (resultado.notaAluno && resultado.notaAluno[index]) || []);
      
            setResultadoFiltrado({
              ...resultado,
              alunos: alunosOrdenadosPorMedia || [],
              mediaPonds: mediaPondsOrdenadas || [],
              notaAluno: notaAlunoOrdenada || [],
            });
          }
        };
      
        if (sortValue) {
          ordenarPor(sortValue);
        }
      }, [sortValue, resultado]);
    
    return(
        <section>
          <Card body 
            bg={"secondary"}
            text={"white"}
            className="mb-2 Box"
          >
            <HeaderBts
            title={"Tabela de Alunos"}
            />
            <TableListAlunoSelect
                resultado={resultadoFiltrado?resultadoFiltrado:resultado}
                setAlunosMarcados={setAlunosMarcados}
                alunosMarcados={alunosMarcados   }
            >
            </TableListAlunoSelect>
            <UtilAgrupMediaPond
                setTextInput={setTextInput}
                textInput={textInput}
                setSortValue={setSortValue}
                sortValue={sortValue}
            ></UtilAgrupMediaPond>

          </Card>

        </section>
    )
}

export default BoxListAlunoSelect;