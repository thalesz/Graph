import { opcSelecionadasProps } from "./interface";
import Header from "./Header";

const BoxRelNotas: React.FC<opcSelecionadasProps> = ({opcSelecionadas}) =>{
    return(
        <section className="BoxForm">
            <Header
                title={"Tabela"}
                subtitle={"referente a média ponderada por alunos"}
            ></Header>
        </section>
    )
}

export default BoxRelNotas;