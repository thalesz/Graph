import Card from "react-bootstrap/esm/Card"
import { IMediaPondGrupo } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";
import GraphAlunoMediaPondScatter from "./GraphAlunoMediaPondScatter";
import { BoxThreeGraphAgrupProps } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";
import { useState } from "react";
import Utils from "./Utils";

const BoxThreeGraphAgrup: React.FC<BoxThreeGraphAgrupProps> = ({resultado})=>{
    const [selectAgrup, setSelectAgrup] = useState<boolean>(false)
    return(
        <Card body 
            bg={"secondary"}
            text={"white"}
            className="mb-2 Box2"
          >
            <GraphAlunoMediaPondScatter resultado={resultado} sort={selectAgrup}></GraphAlunoMediaPondScatter>   
                {resultado !== undefined &&(
                    <Utils
                    sortValue={selectAgrup}
                    setSortValue={setSelectAgrup}
                    trueValue={"Grupo"}
                    falseValue={"Nome"}
                    ></Utils>        
                )}            
        </Card>
    )
}

export default BoxThreeGraphAgrup;