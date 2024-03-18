import { selectGrupoProps } from "../AgrupMediaPond/interface";



const SelectGrupo: React.FC<selectGrupoProps>= ({grupos, setGrupoSelect}) => {
    const handleSelectChange = (e:any)=>{
        setGrupoSelect(e.target.value)
        // console.log
    }
    return(
        <section className="selectGrupo">
    
                    <select disabled={grupos.length===0}  onChange={handleSelectChange} >
                        {
                            grupos && grupos.length>0?(
                            <>
                                <option value={''}>
                                        Todos
                                </option>
                                {grupos.map((option, index) => (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                        ))}
                            
                            </>
                            
                            ):(<></>)
                        }
                            
                        
                    </select>
           
        </section>
    )
}
export default SelectGrupo;