import { useEffect, useState } from "react";

const useDefineGraph = (text: string) => {
    const [tipo, setTipo] = useState<string>('');

    useEffect(() => {
        console.log("Rex", text)
        const novoTipo = text === 'Dispersão' ? 'scatter' : text === 'Barras' ? 'bar' : '';
        setTipo(novoTipo);
    }, [text]);

    return { tipo };
}

export default useDefineGraph;
