import { useEffect, useState } from "react"
import { FeedAlunoProps } from "../AgrupMediaPond/interface"
import SingleAlunoSelect from "./SingleAlunoSelect"
    
    const FeedAluno: React.FC<FeedAlunoProps> = ({alunos, setTextInput, alunoSelec, setAlunoSelec})=>{
        useEffect(()=>{
            console.log("alunosSelec", alunoSelec)
        },[alunoSelec])
        return(
           <section className="FeedAluno">
                <ul className="chamada">
                    <li className="cabecalho">
                        <span>Aluno</span>
                        <span>Grupo</span>
                    </li>
                    <section className="boxFeed">
                        {alunos.map(aluno => (
                            <SingleAlunoSelect
                                key={aluno._id}
                                aluno={aluno}
                                alunoSelec={alunoSelec}
                                setAlunoSelec={setAlunoSelec}
                                setTextInput={setTextInput}
                            />
                        
                        ))}
                    </section>
                    
                </ul>
           </section>
        )
    }

    export default FeedAluno