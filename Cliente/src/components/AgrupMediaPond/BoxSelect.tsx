import React, { useEffect, useState } from "react";
import SelectGenerico from "./SelectGenerico";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ITurma {
  _id: string;
  nome: string;
  codigo: string;
}

interface ISimulado {
  _id: string;
  descricao: string;
  codigo_disciplina: string[];
  codigo_turmas: string[];
}

interface IDisciplina {
  _id: string;
  descricao: string;
}

interface BoxSelectProps {
  setOpcSelecionadas: (opc: { turma: string; disciplina: string; simulado: string }) => void;
}

const BoxSelect: React.FC<BoxSelectProps> = ({setOpcSelecionadas}) => {
  const [turmas, setTurmas] = useState<ITurma[]>([]);
  const [selectTurmaId, setSelectTurmaId] = useState<string>('');
  const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([]);
  const [selectDisciplinaId, setSelectDisciplinaId] = useState<string>('');
  const [simulados, setSimulados] = useState<ISimulado[]>([]);
  const [selectSimuladoId, setSelectSimuladoId] = useState<string>('');

  const axiosPrivate = useAxiosPrivate();

  const handleOpcoes = ()=>{
    setOpcSelecionadas({
      turma: selectTurmaId,
      disciplina: selectDisciplinaId,
      simulado: selectSimuladoId,
    });
    
  }

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();
      try {

        const responseTurma = await axiosPrivate.get<ITurma[]>('/turmas', {
          signal: controller.signal
        });

        setTurmas(responseTurma.data);
        setDisciplinas([])
        setSelectDisciplinaId('')

        if (selectTurmaId && selectTurmaId !== '') {
          const responseDisciplina = await axiosPrivate.get<IDisciplina[]>('/disciplinas', {
            params: {
              selectTurmaId: selectTurmaId,
            },
            signal: controller.signal
          });
          setDisciplinas(responseDisciplina.data);
        }

      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.warn('Request was canceled due to component unmounting');
        } else {
          console.error(err);
        }
      } finally {
        controller.abort();
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [selectTurmaId, axiosPrivate]);

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();
      try {
        
        setSimulados([]);
        setSelectSimuladoId('')

        if (selectDisciplinaId && selectDisciplinaId !== '') {
          const responseSimulado = await axiosPrivate.get<ISimulado[]>('/simulados', {
            params: {
              selectTurmaId: selectTurmaId,
              selectDisciplinaId: selectDisciplinaId
            },
            signal: controller.signal
          });
          setSimulados(responseSimulado.data);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.warn('Request was canceled due to component unmounting');
        } else {
          console.error(err);
        }
      } finally {
        controller.abort();
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [selectDisciplinaId, axiosPrivate]);

  const options = turmas.map(turma => ({
    label: turma.nome,
    value: turma._id
  }));

  const optionsDisciplina = disciplinas.map(disciplina => ({
    label: disciplina.descricao,
    value: disciplina._id
  }));

  const optionsSimulados = simulados.map(simulado => ({
    label: simulado.descricao,
    value: simulado._id
  }));

  return (
    <section className="BoxSelect card-other">
      <SelectGenerico
        label={"Selecione a Turma"}
        options={options}
        select={selectTurmaId}
        setSelect={setSelectTurmaId}
      />

      {/* {selectTurmaId && selectTurmaId !== "" && ( */}
        <SelectGenerico
          label={"Selecione a disciplina"}
          options={optionsDisciplina}
          select={selectDisciplinaId}
          setSelect={setSelectDisciplinaId}
          
        />
       {/* )} */}

      {/* {selectDisciplinaId && selectDisciplinaId !== "" && ( */}
        <SelectGenerico
          label={"Selecione o simulado"}
          options={optionsSimulados}
          select={selectSimuladoId}
          setSelect={setSelectSimuladoId}
        />
      {/* )} */}

      {selectSimuladoId && selectSimuladoId !==""&&(
        <button onClick={handleOpcoes}>
            Gerar Gráfico
        </button>
      )
        
      }
    </section>
  );
};

export default BoxSelect;
