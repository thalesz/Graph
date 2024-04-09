import { useState } from "react";
import { SelectSingleAlunoProps } from "./interfaceBoxDuvPerQuestao";
import Form from 'react-bootstrap/Form';

const SelectSingleAluno:React.FC<SelectSingleAlunoProps>=({aluno,alunoSelec, setAlunoSelec, setTextInput})=>{
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
        <Form.Check
            name="alunoCheck"
            type='checkbox'
            id={`${aluno._id}`}
            checked={alunoSelec.includes(aluno._id)}
            onChange={handleRadioChange}
            key={aluno._id}
        />
    )
}

export default SelectSingleAluno;