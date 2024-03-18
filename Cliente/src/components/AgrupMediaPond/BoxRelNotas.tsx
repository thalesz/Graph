import {IMediaPondGrupo } from "./interface";
import Header from "./Header";
import TableMediaPond from "./TableMediaPond";
import Searchbyname from "./Searchbyname";
import UtilAgrupMediaPond from "./UtilAgrupMediaPond";
import { useEffect, useState } from "react";

const BoxRelNotas: React.FC<IMediaPondGrupo|any> = ({resultado}) =>{
    const [textInput, setTextInput] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [resultadoFiltrado, setResultadoFiltrado] = useState<IMediaPondGrupo | undefined>(undefined);


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
        <section className="BoxForm">

            <div className="header-and-util-wrapper">
                <Header
                    title={"Tabela"}
                    subtitle={"referente a média ponderada por alunos"}
                ></Header>
            </div>
          
            <TableMediaPond
                resultado={resultadoFiltrado}
            >
            </TableMediaPond>
            <div className="table-wrapper">

            </div>
            <UtilAgrupMediaPond
                setTextInput={setTextInput}
                textInput={textInput}
                setSortValue={setSortValue}
                sortValue={sortValue}
            ></UtilAgrupMediaPond>

        </section>
    )
}

export default BoxRelNotas;