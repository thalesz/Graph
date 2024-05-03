import React, { useEffect, useState } from "react";
import { Itens, ResultadoMetricas, TableListAlunoSelectProps } from "../0. Interface/metricasInterface";
import useFiltrarAlunos from "../../hooks/useFiltrarAluno";
import { IAluno } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";

import Card from 'react-bootstrap/Card'
import HeaderBts from '../DuvidaPorQuestaoBTS/HeaderBts';
import TableAlunoSelect from "./TableAlunoSelec";
import UtilTableDuvPerQuestao from "../DuvidaPorQuestaoBTS/UtilTableDuvPerQuestao";
import UtilAgrupMediaPond from "../AgrupMediaPond/UtilAgrupMediaPond";
import SelectGrupo from "../DuvidaPorQuestao/SelectGruṕo";
import useFiltrarGrupos from "../../hooks/useFiltrarGrupos";
import useOrderByName from "../../hooks/useOrderByName";

import useFiltrarEOrdenarAlunos from "../../hooks/useFiltraOrdena";
const BoxListAlunosUtil: React.FC<TableListAlunoSelectProps> = ({ resultado, alunosMarcados, setAlunosMarcados }) => {
    // Aqui você pode acessar os dados passados para o componente
    const [alunos, setAlunos] = useState<IAluno[]>([]);
    const [textInput, setTextInput] = useState('')
    const [sortValue, setSortValue] = useState('n')
    // const [grupos,setGrupos]= useState<string[]>([]);
    const [grupoSelect, setGrupoSelect]=useState<string>('')
    let alunosFiltrado: Itens| undefined;
    alunosFiltrado = useFiltrarEOrdenarAlunos(resultado, textInput, grupoSelect);


    let grupos: string[] = (useFiltrarGrupos(resultado));

    

     useEffect(()=>{
         console.log("sortvalue", sortValue);
     },[sortValue])
  

    return (
          <section>
            <Card body 
              bg={"secondary"}
              text={"white"}
              className="mb-2 Box"
            >
            <HeaderBts
            title={"Alunos"}
            />


            <TableAlunoSelect
                resultado={alunosFiltrado?alunosFiltrado:resultado}
                setAlunosMarcados={setAlunosMarcados}
                alunosMarcados={alunosMarcados}
            >
            </TableAlunoSelect>



            <UtilTableDuvPerQuestao
              setTextInput={setTextInput}
              textInput={textInput}
              grupos={grupos}
              setGrupoSelect={setGrupoSelect}
            ></UtilTableDuvPerQuestao>


          </Card>

        </section>
    );
};

export default BoxListAlunosUtil;
