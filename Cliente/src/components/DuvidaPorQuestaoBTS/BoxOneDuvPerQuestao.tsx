import Card from 'react-bootstrap/Card'
import HeaderBts from './HeaderBts';
import { BoxOneDuvPerQuestaoProps } from './interfaceBoxDuvPerQuestao';
import FormOneDuvPerQuestao from './FormOneDuvPerQuestao';

const BoxOneDuvPerQuestao: React.FC<BoxOneDuvPerQuestaoProps>=({title, setOpcSelecionadas})=>{
    return (
        <section>
          <Card body 
            bg={"secondary"}
            text={"white"}
            className="mb-2 Box"
          >
            {/* <HeaderBts
            title={title}
            /> */}
            <FormOneDuvPerQuestao
              setOpcSelecionadas={setOpcSelecionadas}
            >
            </FormOneDuvPerQuestao>
            


          </Card>

        </section>
      );
}

export default BoxOneDuvPerQuestao