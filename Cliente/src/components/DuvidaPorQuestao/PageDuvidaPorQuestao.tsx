import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import FormPageAgrupMediaPond from "../AgrupMediaPond/FormPageAgrupMediaPond";
import FeedAndSeachPage from "./FeedAndSeachPage";
import { IDuvidaQuestaoAlunos } from "../AgrupMediaPond/interface";
import PageGraph from "./PageGraph";
const PageDuvidaPorQuestao = ()=>{

    const axiosPrivate = useAxiosPrivate();

    const [resultado, setResultado] =useState<IDuvidaQuestaoAlunos|undefined>(undefined)
    const [resultadoFiltrado, setResultadoFiltrado] = useState<IDuvidaQuestaoAlunos|undefined>()
    const [alunoSelec, setAlunoSelec] = useState<string[]>([])


    const [opcSelecionadas, setOpcSelecionadas] = useState({
        turma: '',
        disciplina: '',
        simulado: ''
    }); 
    
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

    return(
        <section className="Page">
            <FormPageAgrupMediaPond
                setOpcSelecionadas={setOpcSelecionadas}
                title="Dúvida por questões"
                subtitle="Gere um gráfico referente a quantidade de dúvidas por questão"
            />
            <FeedAndSeachPage
                resultado={resultado}
                setResultadoFiltrado={setResultadoFiltrado}
                alunoSelec={alunoSelec}
                setAlunoSelec={setAlunoSelec}
            >

            </FeedAndSeachPage>
            <PageGraph
                resultado={resultado}
                alunoSelec={alunoSelec}
            ></PageGraph>
            {/* <BoxGraph></BoxGraph> */}
        </section>
    )
}

export default PageDuvidaPorQuestao