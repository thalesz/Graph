import { useEffect, useState } from "react";
import { IDuvidas, Props } from "../AgrupMediaPond/interface";
import { clickedProps } from "../AgrupMediaPond/interface";

const BoxDuvidaResposta:React.FC<Props & clickedProps & any> =({duvidas,questoes,alunos, clicked, setClicked})=>{
    const [questao, setQuestao] = useState<string>('');
    const [duvida, setDuvida] = useState<string>('');
    const [alunoNome,setAlunoNome]=useState<string>("");
    const [grupo,setGrupo]=useState<string>("")

    const handleVoltar = ()=>{
        setClicked({
            // tooltipIndex: tooltipIndex,
            // datasetIndex: datasetIndex
            questao:'',
            aluno:'',
            grupo:'',
            duvida:''
          })
    }
    useEffect(()=>{
        setQuestao(clicked.questao)
        setDuvida(clicked.duvida)
        setAlunoNome(clicked.aluno)
        setGrupo(clicked.grupo)

        console.log("clicked", clicked)
    },[clicked])

  return (
    <section className="DuvidaBox">
      {duvida && (

        <>
          <h2>Questão: {questao}</h2>
          <h3>Grupo: {grupo}</h3>
          {clicked.aluno.map((aluno:any, index:any) => (
            <div key={index} className="DuvidaDiv">
            <p>Dúvida: {clicked.duvida[index]}</p>
            <p>Aluno: {aluno}</p>
            </div>
      ))}
          <button onClick={handleVoltar}>Voltar</button>

        </>
      )}
    </section>
  );
}
export default BoxDuvidaResposta;