import Searchbyname from "./Searchbyname"
import { SearchbynameProps, SortNameValueProps } from "./interface"
import SortNameValue from "./SortNameValue"
const UtilAgrupMediaPond: React.FC<SearchbynameProps & SortNameValueProps > = ({setTextInput, textInput, sortValue, setSortValue})=>{
    return(
        <section className="UtilSearchByName">
            <Searchbyname
                setTextInput={setTextInput}
                textInput={textInput}
                
            />       
            <SortNameValue
                sortValue={sortValue}
                setSortValue={setSortValue}
            />      
            

        </section>
    )
}
export default UtilAgrupMediaPond;