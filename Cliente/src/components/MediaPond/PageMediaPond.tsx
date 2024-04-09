import { useEffect, useState } from "react";
import BoxOneDuvPerQuestao from "../DuvidaPorQuestaoBTS/BoxOneDuvPerQuestao"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IAluno, IMediaPondGrupo } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";
import BoxListAlunoSelect from "./BoxListAlunoSelec";
import BoxGraphAlunoSelect from "./BoxGraphAlunoSelect";
import Graph02 from "./Graph02";


const PageMediaPond:React.FC=()=>{


    const [resultado, setResultado] = useState<IMediaPondGrupo | undefined>(undefined);
    const [resultadoFiltrado, setResultadoFiltrado] = useState<IMediaPondGrupo | undefined>(undefined);
    const [alunosMarcados, setAlunosMarcados] = useState<string[]>([]); // Estado para armazenar IDs de alunos marcados


    const axiosPrivate = useAxiosPrivate(); 

    
    const [opcSelecionadas, setOpcSelecionadas] = useState({
        turma: '',
        disciplina: '',
        simulado: ''
    }); 

    useEffect(()=>{
        console.log(opcSelecionadas)
        console.log("resultaado", resultado)
    },[opcSelecionadas, resultado])
    

    useEffect(()=>{
        //  console.log("opcSelecionadas", opcSelecionadas)
          const fetchData= async()=>{
              const controller = new AbortController();
              try{
                  if (opcSelecionadas && Object.values(opcSelecionadas).every(value => value !== '')){
                      const responseMediaPondGrupo = await axiosPrivate.get<IMediaPondGrupo>('/mediaPondGrupo', {
                          params: {
                              selectTurmaId: opcSelecionadas.turma,
                              selectDisciplinaId: opcSelecionadas.disciplina,
                              selectSimuladoId: opcSelecionadas.simulado
                          },
                          signal: controller.signal
                        
                      });
                     // console.log("responseMEdiaPondGrupo", responseMediaPondGrupo);
                      setResultado(responseMediaPondGrupo.data)
                     //  console.log("Resultado", resultado);
                  }
                  
              }catch(err:any){
                  if (err.name === 'AbortError') {
                      console.warn('Request was canceled due to component unmounting');
                    } else {
                      console.error(err);
                      console.error(err);
                    }
                  } finally {
                    controller.abort();
                  }
          }
          fetchData();
  
          return () => {
          // Cleanup function
          };
  
      },[opcSelecionadas, useAxiosPrivate])


      useEffect(() => {
        if (resultado) {
            const alunosFiltrados = resultado.alunos.filter((aluno: IAluno) => alunosMarcados.includes(aluno._id));
            const mediaPondsFiltrados = resultado.mediaPonds.filter((_, index) => alunosMarcados.includes(resultado.alunos[index]._id));
            const notaAlunoFiltrada = resultado.notaAluno.filter((_, index) => alunosMarcados.includes(resultado.alunos[index]._id));

            setResultadoFiltrado({
                alunos: alunosFiltrados,
                mediaPonds: mediaPondsFiltrados,
                notaAluno: notaAlunoFiltrada
            });
        }
        if (alunosMarcados.length===0){
            setResultadoFiltrado(undefined)
        }
    }, [alunosMarcados]);
    return(
        <section>

            <BoxOneDuvPerQuestao 
                setOpcSelecionadas={setOpcSelecionadas}
                title="Média Ponderada"
                ></BoxOneDuvPerQuestao>
            <BoxListAlunoSelect resultado={resultado} setAlunosMarcados={setAlunosMarcados} alunosMarcados={alunosMarcados}>
            </BoxListAlunoSelect>
            <BoxGraphAlunoSelect resultado={resultadoFiltrado !==undefined ? resultadoFiltrado:resultado}></BoxGraphAlunoSelect>
            
            <Graph02 resultado={resultadoFiltrado !==undefined ? resultadoFiltrado:resultado}></Graph02>


        </section>
    )
}
export default PageMediaPond