import { useEffect, useState } from "react";
import { Itens } from "../components/0. Interface/metricasInterface";

const useFiltrarGrupos = (resultado: Itens | undefined) => {
    const [gruposReturn, setGruposReturn] = useState<string[]>([]);
    
    useEffect(() => {
        if (resultado && resultado !== undefined) {
            const gruposTemp = resultado.map(item => item.aluno.grupo);
            const gruposSet = new Set(gruposTemp);
            const grupos = Array.from(gruposSet);
            
            console.log("grupos", grupos);
            setGruposReturn(grupos);
        }
    }, [resultado]);

    return gruposReturn;
};

export default useFiltrarGrupos;
