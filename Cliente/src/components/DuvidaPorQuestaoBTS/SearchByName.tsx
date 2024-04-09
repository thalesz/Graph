import { SearchByNameProps } from "./interfaceBoxDuvPerQuestao";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchByName: React.FC<SearchByNameProps> = ({ setTextInput, textInput })=>{

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
      };
    

    return(
        <InputGroup >
            <InputGroup.Text id="basic-addon1">Aluno</InputGroup.Text>
            <Form.Control 
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={textInput}
                onChange={handleInputChange}
                />
        </InputGroup>
    )
}

export default SearchByName;