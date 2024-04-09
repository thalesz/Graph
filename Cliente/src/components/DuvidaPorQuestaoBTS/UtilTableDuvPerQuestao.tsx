import { Select } from "@mui/material";
import SearchByName from "./SearchByName";
import { SearchByNameProps } from "./interfaceBoxDuvPerQuestao";
import { SelectGrupoProps } from "./interfaceBoxDuvPerQuestao";
import SelectGrupo from "./SelectGrupo";
const UtilTableDuvPerQuestao: React.FC<SearchByNameProps & SelectGrupoProps> = ({setTextInput, textInput, grupos, setGrupoSelect})=>{
    return(
        <section className="utils">
            <SearchByName
                setTextInput={setTextInput}
                textInput={textInput}
            />
            <SelectGrupo
                grupos={grupos}
                setGrupoSelect={setGrupoSelect}
            ></SelectGrupo>
        </section>

    )
}

export default UtilTableDuvPerQuestao;