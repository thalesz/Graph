
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IAluno, IMediaPondGrupo } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";
import { Itens } from "../0. Interface/metricasInterface";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BoxOneDuvPerQuestao from "../DuvidaPorQuestaoBTS/BoxOneDuvPerQuestao";
import BoxListAlunoSelect from "../MediaPond/BoxListAlunoSelec";
import { ResultadoMetricas } from "../0. Interface/metricasInterface";
import BoxListAlunosUtil from "./BoxListAlunosUtil";

import useFetchDataAssertComp from "../../hooks/useFetchDataAssertComp";
import BoxGraphMetricas from "./BoxGraphMetricas";
import useFiltraPorId from "../../hooks/useFiltraPorId";

//página: seletor, listagem, gráfico
//
interface MetricasProps{
  url:string
}
const Metricas: React.FC<MetricasProps> = ({url})=>{

    const [resultado, setResultado] = useState<Itens | undefined>(undefined);
    // const [resultadoFiltrado, setResultadoFiltrado] = useState<Itens | undefined>(undefined);
    const [alunosMarcados, setAlunosMarcados] = useState<string[]>([]); // Estado para armazenar IDs de alunos marcados

    const [opcSelecionadas, setOpcSelecionadas] = useState({
        turma: '',
        disciplina: '',
        simulado: ''
    }); 
  
    useFetchDataAssertComp(opcSelecionadas, setResultado, url);
    let resultadoFiltrado: Itens|undefined = useFiltraPorId(resultado, alunosMarcados)

    return(
        <Container fluid>
        <Row>
          <Col>
            <Row >
              <Col>
                   <BoxOneDuvPerQuestao 
                        setOpcSelecionadas={setOpcSelecionadas}
                        title=""
                    ></BoxOneDuvPerQuestao>
              </Col>
              <Col >
              <BoxListAlunosUtil
                  resultado={resultado}
                  alunosMarcados={alunosMarcados}
                  setAlunosMarcados={setAlunosMarcados}
              ></BoxListAlunosUtil>
              </Col>
            </Row>
          </Col>
          <Col style={{ minHeight: '650px', width: '700px' }} >
              <BoxGraphMetricas
                itens={resultadoFiltrado!==undefined ? resultadoFiltrado : resultado}
                text={''}
              ></BoxGraphMetricas>
            
          </Col>

        </Row>
      </Container>
    )
}

export default Metricas;