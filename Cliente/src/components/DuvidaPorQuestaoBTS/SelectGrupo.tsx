import { SelectGrupoProps } from "./interfaceBoxDuvPerQuestao"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const SelectGrupo: React.FC<SelectGrupoProps>= ({grupos, setGrupoSelect}) => {
    const handleSelectChange = (e:any)=>{
        setGrupoSelect(e.target.value)
        // console.log
    }
    return(
        <InputGroup>
                <InputGroup.Text id="basic-addon1">Grupo</InputGroup.Text>

                <Form.Select disabled={grupos.length===0}  onChange={handleSelectChange} >
                        {
                            grupos && grupos.length>0?(
                            <>
                                <option value={''}>
                                        Todos
                                </option>
                                {grupos.map((option, index) => (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                        ))}
                            
                            </>
                            
                            ):(<></>)
                        }
                            
                        
                    </Form.Select >
           
        </InputGroup>
    )
}
export default SelectGrupo;