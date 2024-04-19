import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { IDisciplina, ISimulado, ITurma } from './interfaceBoxDuvPerQuestao';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SingleSelectBts from './SingleSelectBts';
import Button from 'react-bootstrap/Button';



const FormOneDuvPerQuestao: React.FC<any> = ({setOpcSelecionadas})=>{
    const [turmas, setTurmas] = useState<ITurma[]>([]);
    const [selectTurmaId, setSelectTurmaId] = useState<string>('');
    const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([]);
    const [selectDisciplinaId, setSelectDisciplinaId] = useState<string>('');
    const [simulados, setSimulados] = useState<ISimulado[]>([]);
    const [selectSimuladoId, setSelectSimuladoId] = useState<string>('');

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        function simulateNetworkRequest() {
          return new Promise((resolve) => setTimeout(resolve, 1000));
        }
    
        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);
    

    const axiosPrivate = useAxiosPrivate();

    const handleOpcoes = ()=>{
        setLoading(true);
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

    return(
        <Form>
            <SingleSelectBts
                label={"Selecione a Turma"}
                options={options}
                select={selectTurmaId}
                setSelect={setSelectTurmaId}
            />

            <SingleSelectBts
                label={"Selecione a disciplina"}
                options={optionsDisciplina}
                select={selectDisciplinaId}
                setSelect={setSelectDisciplinaId}
            />
            <SingleSelectBts
                label={"Selecione o simulado"}
                options={optionsSimulados}
                select={selectSimuladoId}
                setSelect={setSelectSimuladoId}
            />
            {selectSimuladoId && selectSimuladoId !==""&&(
                // <button onClick={handleOpcoes}>
                //     Gerar Gráfico
                // </button>


                <Button
                    className='BtnGerarGrafico'
                    variant="primary"
                    disabled={isLoading}
                    onClick={!isLoading ? handleOpcoes : undefined}
                    >
                    {isLoading ? 'Carregando…' : 'Gerar Gráfico'}
                </Button>
            )}
            
        </Form>
    )
}

export default FormOneDuvPerQuestao;