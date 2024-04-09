import Card from "react-bootstrap/esm/Card"
import { IMediaPondGrupo } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao"
import GraphAlunoMediaPond from "./GraphAlunoMediaPond"

const BoxGraphAlunoSelect: React.FC<{ resultado: IMediaPondGrupo|any }>  = ({resultado})=>{
    return(
        <Card body 
            bg={"secondary"}
            text={"white"}
            className="mb-2 Box"
          >
            <GraphAlunoMediaPond resultado={resultado}></GraphAlunoMediaPond>    
        </Card>
    )
}

export default BoxGraphAlunoSelect