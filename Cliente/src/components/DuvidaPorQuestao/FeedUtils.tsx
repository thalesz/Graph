import Searchbyname from "../AgrupMediaPond/Searchbyname"
import { SearchbynameProps, selectGrupoProps } from "../AgrupMediaPond/interface"
import SelectGrupo from "./SelectGruṕo"

const FeedUtils: React.FC<SearchbynameProps & selectGrupoProps>= ({setTextInput, textInput, grupos, setGrupoSelect})=>{
    return(
        <section className="Utils">
            <Searchbyname
                setTextInput={setTextInput}
                textInput={textInput}
            ></Searchbyname>
            <SelectGrupo
                grupos={grupos}
                setGrupoSelect={setGrupoSelect}
            >
            </SelectGrupo>

        </section>
    )
}

export default FeedUtils