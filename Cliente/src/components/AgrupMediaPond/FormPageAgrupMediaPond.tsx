import Header from "./Header"
import BoxSelect from "./BoxSelect"
import { useEffect, useState } from "react";


interface FormPageAgrupMediaPondProps {
    setOpcSelecionadas: (opc: { turma: string; disciplina: string; simulado: string }) => void;
    title:string,
    subtitle:string
} 

const FormPageAgrupMediaPond: React.FC<FormPageAgrupMediaPondProps>=({setOpcSelecionadas, title, subtitle})=>{

    return(
        <div className="BoxForm">
            <Header
                title={title}
                subtitle={subtitle}
            ></Header>
            <BoxSelect
                setOpcSelecionadas={setOpcSelecionadas}
            ></BoxSelect>
        </div>
    )
}
export default FormPageAgrupMediaPond