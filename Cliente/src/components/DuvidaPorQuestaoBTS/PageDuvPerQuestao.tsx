import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// import FormDuvPerQuestao from "./BoxOneDuvPerQuestao";
import BoxOneDuvPerQuestao from "./BoxOneDuvPerQuestao";
import { IDuvidaQuestaoAlunos } from "./interfaceBoxDuvPerQuestao";
import BoxTwoDuvPerQuestao from "./BoxTwoDuvPerQuestao";
import BoxThreeDuvPerQuestao from "./BoxThreeDuvPerQuestao";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Graph03 from "./Graph03";

const PageDuvPerQuestao: React.FC = ()=>{
    const axiosPrivate = useAxiosPrivate();

    const [resultado, setResultado] =useState<IDuvidaQuestaoAlunos|undefined>(undefined)
    const [resultadoFiltrado, setResultadoFiltrado] = useState<IDuvidaQuestaoAlunos|undefined>()
    const [alunoSelec, setAlunoSelec] = useState<string[]>([])


    const [opcSelecionadas, setOpcSelecionadas] = useState({
        turma: '',
        disciplina: '',
        simulado: ''
    }); 
    
    // useEffect(()=>{

    // }, [])
    useEffect(()=>{
        const fetchData = async ()=>{
            const controller = new AbortController();
            try{
                if (opcSelecionadas && Object.values(opcSelecionadas).every(value => value !== '')){
                    const response = await axiosPrivate.get<IDuvidaQuestaoAlunos>('/duvidaQuestaoAluno', {
                        params: {
                            selectTurmaId: opcSelecionadas.turma,
                            selectDisciplinaId: opcSelecionadas.disciplina,
                            selectSimuladoId: opcSelecionadas.simulado
                        },
                        signal: controller.signal
                      
                    });
                   // console.log("responseMEdiaPondGrupo", responseMediaPondGrupo);
                    setResultado(response.data)
                     console.log("Resultado", resultado);
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[opcSelecionadas])

    return (
        <Container fluid>
          <Row className="h-100 gx-1">
            <Col>
              <Row className="h-100">
                <Col>
                  <BoxOneDuvPerQuestao
                    title={"Dúvida por questão"}
                    setOpcSelecionadas={setOpcSelecionadas}
                  />
                </Col>
                <Col>
                  <BoxTwoDuvPerQuestao
                    title={"Tabela resultante"}
                    resultado={resultado}
                    alunoSelec={alunoSelec}
                    setAlunoSelec={setAlunoSelec}
                  />
                </Col>
              </Row>
            </Col>
            <Col style={{ minHeight: '880px', width: '700px' }} className="h-100">
              <BoxThreeDuvPerQuestao
                alunoSelec={alunoSelec}
                resultado={resultado}
                // style={{ height: '100%' }}
              />
               <Graph03/>
            </Col>

          </Row>
        </Container>
      );
}
export default PageDuvPerQuestao