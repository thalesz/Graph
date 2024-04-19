
import { useEffect, useState } from "react";
import HeaderBts from "./HeaderBts";
import { BoxThreeDuvPerQuestaoProps, IAluno, IDuvidas, IQuestoes } from "./interfaceBoxDuvPerQuestao";
import Card from 'react-bootstrap/Card'
import ChartDuvPerQuestao from "./ChartDuvPerQuestao";
import Graph03 from "./Graph03";

const BoxThreeDuvPerQuestao: React.FC<BoxThreeDuvPerQuestaoProps> = ({alunoSelec, resultado})=>{
    const [alunos, setAlunos] = useState<IAluno[]>([]);
    const [questoes, setQuestoes] = useState<IQuestoes[]>([]);
    const [duvidas, setDuvidas]= useState<IDuvidas[]>([]);
    const [grupos,setGrupos]= useState<string[]>([]);
    const [alunosFiltrados, setAlunosFiltrados]= useState<IAluno[]|undefined>([])
    const [duvidasFiltradas, setDuvidasFiltradas]=useState<IDuvidas[]|undefined>([])
    
    const [clicked, setClicked] = useState({
        questao: '',
        aluno: '',
        grupo: '',
        duvida:''
    }); 
  
  
    // useEffect(()=>{
    //   console.log("Cliicked", clicked)
    // }, [clicked])
  
    useEffect(()=>{
      if (resultado && resultado !== undefined && alunoSelec && alunoSelec.length > 0) {
          const filtro = alunos.filter(aluno => alunoSelec.includes(aluno._id));
         
          setAlunosFiltrados(filtro)
          const filtroDuvidas = duvidas.filter(duvida=>  alunoSelec.includes(duvida.id_aluno))  
  
          setDuvidasFiltradas(filtroDuvidas)
      }if(alunoSelec.length===0){
        setDuvidasFiltradas(undefined)
      }
    },[resultado, alunoSelec, duvidas])
  
  
  
    useEffect(()=>{
  
      if(resultado && resultado !== undefined){
        setAlunos(resultado.alunos);
        setQuestoes(resultado.questoes);
        setDuvidas(resultado.duvidas);
        console.log("resultados", resultado)
         // Usar um conjunto para armazenar grupos únicos
         // Use um array temporário para armazenar grupos únicos
        const gruposTemp = resultado.alunos.map(aluno => aluno.grupo);
  
        // Remover duplicatas usando Set
        const gruposSet = new Set(gruposTemp);
  
        // Converter o conjunto de volta para um array
        const grupos = Array.from(gruposSet);
        console.log("duvidas", duvidas)
  
        // console.log("aleluia jeova", grupos);
        setGrupos(grupos);
        console.log("feriado", grupos)
      }
    }, [resultado])
    return(
        <Card body  
            bg={"secondary"}
            text={"white"}
            className="mb-2 Box2 All GraphDuvidaPorQuestao">

                {/* <HeaderBts
                    title="Gráfico"
                /> */}

                {/* <ChartDuvPerQuestao duvidas={duvidas} questoes={questoes} alunos={alunos} setClicked={setClicked} grupos={grupos}>
                    
                </ChartDuvPerQuestao > */}
                <Graph03 duvidas={duvidas} questoes={questoes} alunos={alunos} setClicked={setClicked} grupos={grupos}>
                  
                </Graph03>
                

        </Card>
    )
}

export default BoxThreeDuvPerQuestao;