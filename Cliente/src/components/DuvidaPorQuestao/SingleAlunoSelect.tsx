import { useState } from "react";
import {SingleAlunoSelectProps } from "../AgrupMediaPond/interface";

const SingleAlunoSelect:React.FC<SingleAlunoSelectProps> = ({aluno, alunoSelec, setAlunoSelec, setTextInput})=>{
    const  [radioSelecionado, setRadioSelecionado] = useState(false)
    const handleRadioChange = () => {
        const updatedAlunoSelec = [...alunoSelec];
    
        if (radioSelecionado) {
            // Aluno já estava selecionado, então remova se presente
            const index = updatedAlunoSelec.indexOf(aluno._id);
            if (index !== -1) {
                updatedAlunoSelec.splice(index, 1);
            }
        } else {
            // Aluno não estava selecionado, então adicione se não estiver presente
            if (!updatedAlunoSelec.includes(aluno._id)) {
                updatedAlunoSelec.push(aluno._id);
            }
        }
    
        setRadioSelecionado(!radioSelecionado);
        setAlunoSelec(updatedAlunoSelec);
        setTextInput('');
    };
    
    return(
        <article className={`singleAluno ${alunoSelec.includes(aluno._id) ? 'ativo' : ''}`}>
             <input
                type="checkbox"
                name="alunoCheck"
                id={`${aluno._id}`}
                checked={alunoSelec.includes(aluno._id)}
                onChange={handleRadioChange}
                key={aluno._id}
            />
            <li className="singleAlunoContent">
                <p>{aluno.nome}</p>
                <p className="pGrupo">{aluno.grupo}</p>
                 
            </li>
        </article>
    )
}
export default SingleAlunoSelect;