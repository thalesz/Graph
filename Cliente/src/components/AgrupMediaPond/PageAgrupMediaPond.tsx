import { useEffect, useState } from "react";
import FormPageAgrupMediaPond from "./FormPageAgrupMediaPond"
import BoxRelNotas from "./BoxRelNotas";
//import BoxGraph from "./BoxGraph";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IMediaPondGrupo } from "./interface";

const PageAgrupMediaPond = () =>{
    const [resultado, setResultado] = useState<IMediaPondGrupo | undefined>(undefined);

    const axiosPrivate = useAxiosPrivate();

    const [opcSelecionadas, setOpcSelecionadas] = useState({
        turma: '',
        disciplina: '',
        simulado: ''
      }); 

    useEffect(()=>{
        console.log("opcSelecionadas", opcSelecionadas)
        const fetchData= async()=>{
            const controller = new AbortController();
            try{
                if (opcSelecionadas && Object.values(opcSelecionadas).every(value => value !== '')){
                    const responseMediaPondGrupo = await axiosPrivate.get<IMediaPondGrupo>('/mediaPondGrupo', {
                        params: {
                            selectTurmaId: opcSelecionadas.turma,
                            selectDisciplinaId: opcSelecionadas.disciplina,
                            selectSimuladoId: opcSelecionadas.simulado
                        },
                        signal: controller.signal
                      
                    });
                    console.log("responseMEdiaPondGrupo", responseMediaPondGrupo);
                }
                
            }catch(err:any){
                if (err.name === 'AbortError') {
                    console.warn('Request was canceled due to component unmounting');
                  } else {
                    console.error(err);
                    console.error(err);
                  }
                } finally {
                  controller.abort();
                }
        }
        fetchData();

        return () => {
        // Cleanup function
        };

    },[opcSelecionadas, useAxiosPrivate])

    return(
        <section className="Page">   
            <FormPageAgrupMediaPond
                setOpcSelecionadas={setOpcSelecionadas}
            />
            <BoxRelNotas 
                opcSelecionadas={opcSelecionadas}
            />
            {/* <BoxGraph
                opcSelecionadas={opcSelecionadas}
            /> */}
            
        </section>
    )
}

export default PageAgrupMediaPond