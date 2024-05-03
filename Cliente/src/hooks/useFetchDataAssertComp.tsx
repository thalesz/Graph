import useAxiosPrivate from "./useAxiosPrivate";
import { Itens } from "../components/0. Interface/metricasInterface";
import { useEffect, useState } from "react";
import useOrderByName from "./useOrderByName";

const useFetchDataAssertComp = (
  opcSelecionadas: any,
  setResultado: React.Dispatch<React.SetStateAction<Itens | undefined>>,
  url: string
) => {
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    console.log("url", url)
    const fetchData = async () => {
      if (opcSelecionadas && Object.values(opcSelecionadas).every(value => value !== '')) {
        try {
          const response = await axiosPrivate.get<Itens>(url, {
            params: {
              selectTurmaId: opcSelecionadas.turma,
              selectDisciplinaId: opcSelecionadas.disciplina,
              selectSimuladoId: opcSelecionadas.simulado,
            }
          });
          
          setResultado(response.data);

        } catch (err: any) {
          if (err.name === 'AbortError') {
            console.warn('Request was canceled due to component unmounting');
          } else {
            console.error(err);
          }
        }
      }
    };

    fetchData();

    return () => {}; // Cleanup function vazio, pois não precisamos abortar a requisição manualmente
  }, [opcSelecionadas, axiosPrivate, setResultado]);
};

export default useFetchDataAssertComp;
