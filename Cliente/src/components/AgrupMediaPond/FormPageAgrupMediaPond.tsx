import Header from "./Header"
import BoxSelect from "./BoxSelect"
import { useEffect, useState } from "react";


interface FormPageAgrupMediaPondProps {
    setOpcSelecionadas: (opc: { turma: string; disciplina: string; simulado: string }) => void;
} 

const FormPageAgrupMediaPond: React.FC<FormPageAgrupMediaPondProps>=({setOpcSelecionadas})=>{

    return(
        <div className="BoxForm">
            <Header
                title={"Agrupamento por média ponderada"}
                subtitle={"Verifique o agrupamento por média ponderada para obter insights mais refinados sobre padrões e tendências nos dados"}
            ></Header>
            <BoxSelect
                setOpcSelecionadas={setOpcSelecionadas}
            ></BoxSelect>
        </div>
    )
}
export default FormPageAgrupMediaPond