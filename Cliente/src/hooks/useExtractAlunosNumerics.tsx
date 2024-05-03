import { useEffect, useState } from "react";
import { Item, Itens, NumericProps } from "../components/0. Interface/metricasInterface";
import useOrderByName from "./useOrderByName";
import useDefineGraph from "./useDefineGraph";

const useExtractAlunosNumerics = (itens: Itens | undefined, text: string) => {
    const [alunos, setAlunos] = useState<string[]>([]);
    const [numericProps, setNumericProps] = useState<NumericProps[]>([]);
    const [traces, setTraces] = useState<any>();
    const orderedData: Itens | undefined = useOrderByName(itens);
    const { tipo } = useDefineGraph(text); // Destructure tipo from useDefineGraph

    useEffect(() => {
        if (orderedData !== undefined && itens !== undefined) {
            const itensArray = Object.values(orderedData);
            const alunosNomes = itensArray.map((item: Item) => item?.aluno?.nome);
            setAlunos(alunosNomes);

            const numericProps: NumericProps[] = itensArray.map((item: Item) => {
                const numericKeys: NumericProps = {};
                Object.keys(item).forEach((key: string) => {
                    const value = item[key as keyof Item];
                    if (typeof value === 'number') {
                        numericKeys[key] = value;
                    }
                });
                return numericKeys;
            });
            setNumericProps(numericProps);

            const data = Object.keys(numericProps[0]).map((propName: string) => {
                const lowerPropName = propName.toLowerCase(); // Armazena o nome da propriedade em minúsculas
                
                return {
                    x: alunosNomes,
                    y: numericProps.map((props: NumericProps) => props[propName]),
                    type: tipo, // Use tipo directly
                    name: lowerPropName === 'compreensao' ? 'Compreensão' : (lowerPropName === 'medianormal' ? 'Média Normal' : (lowerPropName === 'mediaponderada' ? 'Média Ponderada' : propName.charAt(0).toUpperCase() + propName.slice(1).toLowerCase())),
                };
            });
            
            
            setTraces(data);
        }
    }, [orderedData, tipo]); // Add tipo as a dependency

    return { alunos, numericProps, traces };
};

export default useExtractAlunosNumerics;
