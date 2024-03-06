import { opcSelecionadasProps } from "./interface";
const BoxGraph: React.FC<opcSelecionadasProps> = ({opcSelecionadas}) =>{
    return(
        <section>
            <p>{opcSelecionadas.turma}</p>
        </section>
    )
}

export default BoxGraph;