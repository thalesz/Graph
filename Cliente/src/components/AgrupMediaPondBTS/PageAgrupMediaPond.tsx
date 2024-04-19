import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IAluno, IMediaPondGrupo } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BoxOneDuvPerQuestao from "../DuvidaPorQuestaoBTS/BoxOneDuvPerQuestao";
import BoxListAlunoSelect from "../MediaPond/BoxListAlunoSelec";
import BoxThreeGraphAgrup from "./BoxThreeGraphAgrup";

const PageAgrupMediaPond: React.FC = ()=>{

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
        <Container fluid>
        <Row>
          <Col>
            <Row >
              <Col>
                   <BoxOneDuvPerQuestao 
                        setOpcSelecionadas={setOpcSelecionadas}
                        title="Média Ponderada"
                    ></BoxOneDuvPerQuestao>
              </Col>
              <Col >
                    <BoxListAlunoSelect resultado={resultado} setAlunosMarcados={setAlunosMarcados} alunosMarcados={alunosMarcados}>
                    </BoxListAlunoSelect>
              </Col>
            </Row>
          </Col>
          <Col style={{ minHeight: '650px', width: '700px' }} >
            {/* <Graph02 resultado={resultadoFiltrado !==undefined ? resultadoFiltrado:resultado}></Graph02> */}
            <BoxThreeGraphAgrup resultado={resultadoFiltrado!==undefined? resultadoFiltrado:resultado}></BoxThreeGraphAgrup>
          </Col>

        </Row>
      </Container>
    )
}

export default PageAgrupMediaPond