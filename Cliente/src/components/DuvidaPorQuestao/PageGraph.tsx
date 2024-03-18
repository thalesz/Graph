

import { useEffect, useState } from "react";
import { IAluno, IDuvidas, IQuestoes, PageGraphProps, clickedProps } from "../AgrupMediaPond/interface";
import Graph01 from "./Graph01";
import Header from "../AgrupMediaPond/Header";
import DuvidasPorQuestoesChart from "./DuvidaPorQuestaoChart";
import BoxDuvidaResposta from "./BoxDuvidaResposta";


const PageGraph: React.FC<PageGraphProps> = ({resultado, alunoSelec}) =>{

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
      // setGrupos(grupos);
    }
  }, [resultado])

  return (
      <section className="BoxForm">
        <Header
            title={"Gráfico"}
            subtitle={"referente a dúvidas por alunos"}
        ></Header>
        <section className="visualize">
          {
            clicked.questao==='' && clicked.aluno===''?(
              <DuvidasPorQuestoesChart
                  duvidas={duvidasFiltradas && duvidasFiltradas.length > 0 ? duvidasFiltradas : duvidas}
                  questoes={questoes}
                  alunos={alunos}
                  setClicked={setClicked}
              ></DuvidasPorQuestoesChart>
            ):(
              
                <BoxDuvidaResposta
                  alunos={alunos}
                  questoes={questoes}
                  duvidas={duvidasFiltradas && duvidasFiltradas.length > 0 ? duvidasFiltradas : duvidas}
                  clicked={clicked}
                  setClicked={setClicked}
                ></BoxDuvidaResposta>
            )}     
        </section>
       
      </section>
  );
}

export default PageGraph;