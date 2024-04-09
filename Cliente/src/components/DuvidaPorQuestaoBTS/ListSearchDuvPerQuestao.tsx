import { useEffect, useState } from "react";
import { IAluno, IDuvidas, IQuestoes, ListSearchDuvPerQuestaoProps } from "./interfaceBoxDuvPerQuestao";
import ListByName from "./ListByName";
import UtilTableDuvPerQuestao from "./UtilTableDuvPerQuestao";

const ListSearchDuvPerQuestao: React.FC<ListSearchDuvPerQuestaoProps> = ({resultado,  alunoSelec, setAlunoSelec})=>{
    const [alunos, setAlunos] = useState<IAluno[]>([]);
    const [questoes, setQuestoes] = useState<IQuestoes[]>([]);
    const [duvidas, setDuvidas]= useState<IDuvidas[]>([]);
    const [textInput, setTextInput] = useState('');
    const [grupos,setGrupos]= useState<string[]>([]);
    const [selectGrupo, setSelectGrupo]=useState<string>('')

    useEffect(() => {
        if (resultado) {
            if (selectGrupo !== '') {
                const alunosDoGrupo = resultado.alunos.filter(aluno => aluno.grupo === selectGrupo);
                setAlunos(alunosDoGrupo);
            } else {
                setAlunos(resultado.alunos);
            }
        }
    }, [resultado, selectGrupo]);
    
    // ...
    useEffect(() => {
        if (resultado) {
            if (textInput !== '') {
                const alunosFiltrados = resultado.alunos.filter(aluno => {
                    return aluno.nome.toLowerCase().includes(textInput.toLowerCase());
                });
                if (selectGrupo !== '') {
                    const alunosDoGrupoFiltrados = alunosFiltrados.filter(aluno => aluno.grupo === selectGrupo);
                    setAlunos(alunosDoGrupoFiltrados);
                } else {
                    setAlunos(alunosFiltrados);
                }
            } else {
                if (selectGrupo !== '') {
                    const alunosDoGrupo = resultado.alunos.filter(aluno => aluno.grupo === selectGrupo);
                    setAlunos(alunosDoGrupo);
                } else {
                    setAlunos(resultado.alunos);
                }
            }
        }
    }, [resultado, selectGrupo, textInput]);
      

    useEffect(()=>{
        if(resultado && resultado !== undefined){
            setAlunos(resultado.alunos);
            setQuestoes(resultado.questoes);
            setDuvidas(resultado.duvidas);
             // Usar um conjunto para armazenar grupos únicos
             // Use um array temporário para armazenar grupos únicos
            const gruposTemp = resultado.alunos.map(aluno => aluno.grupo);

            // Remover duplicatas usando Set
            const gruposSet = new Set(gruposTemp);

            // Converter o conjunto de volta para um array
            const grupos = Array.from(gruposSet);

            console.log("grupos", grupos);
            setGrupos(grupos);
        }
        // setAlunoFilt(alunos)
    },[resultado])
    
    return(
        <section>
            <ListByName
                alunos={alunos}
                setTextInput={setTextInput}
                alunoSelec={alunoSelec}
                setAlunoSelec={setAlunoSelec}
            >

            </ListByName>
            <UtilTableDuvPerQuestao
                textInput={textInput}
                setTextInput={setTextInput}
                grupos={grupos}
                setGrupoSelect={setSelectGrupo}
            >

            </UtilTableDuvPerQuestao>

        </section>
    )
}
export default ListSearchDuvPerQuestao;