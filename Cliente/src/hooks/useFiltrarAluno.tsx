import { useEffect, useState } from "react";
import { IAluno } from "../components/DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";
import { Itens, Item } from "../components/0. Interface/metricasInterface";

const useFiltrarAlunos = (resultado: Itens | undefined, textInput: string, selectGrupo:string, ) => {
    const [alunosFiltrados, setAlunosFiltrados] = useState<Itens | undefined>(undefined);
    useEffect(() => {
        console.log("itennsss", resultado?.[0])
        if (resultado !== undefined) {

            if(textInput!==''){
                const alunosFiltrados: Itens = resultado.filter((value: Item, index: number, array: Item[]) => {
                    return value.aluno.nome.toLowerCase().includes(textInput.toLowerCase())
                });
                
                 if (selectGrupo !== '') {
                     const alunosDoGrupoFiltrados = alunosFiltrados.filter((item:any) => item.aluno.grupo === selectGrupo);
                     setAlunosFiltrados(alunosDoGrupoFiltrados);
                     console.log("alunos")
                 } else {
                     setAlunosFiltrados(alunosFiltrados);
                 }
            }else {
                 if (selectGrupo !== '') {
                     const alunosDoGrupo = resultado.filter((item) => item.aluno.grupo === selectGrupo);
                     setAlunosFiltrados(alunosDoGrupo);
                 } else {
                     let alunos: Itens = resultado.map((value:Item)=>{
                        return value
                     })
                     setAlunosFiltrados(alunos);
                 }
            }
        }
    }, [textInput, resultado, selectGrupo]);

    return alunosFiltrados;
};

export default useFiltrarAlunos;
