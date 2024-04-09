import Card from 'react-bootstrap/Card'
import HeaderBts from './HeaderBts';
import { BoxTwoDuvPerQuestaoProps } from './interfaceBoxDuvPerQuestao';
import ListSearchDuvPerQuestao from './ListSearchDuvPerQuestao';


const BoxTwoDuvPerQuestao:React.FC<BoxTwoDuvPerQuestaoProps>=({title, resultado,alunoSelec, setAlunoSelec})=>{
    return(
        <section>
            <Card body 
            bg={"secondary"}
            text={"white"}
            className="mb-2 Box"
            >
            <HeaderBts
            title={title}
            />
            <ListSearchDuvPerQuestao
                resultado={resultado}
                alunoSelec={alunoSelec}
                setAlunoSelec={setAlunoSelec}
            >
                
            </ListSearchDuvPerQuestao>
          </Card>
        </section>
    )
}

export default BoxTwoDuvPerQuestao;
