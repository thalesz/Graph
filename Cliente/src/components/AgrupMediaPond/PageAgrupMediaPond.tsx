import { useEffect, useState } from "react";
import FormPageAgrupMediaPond from "./FormPageAgrupMediaPond"
import BoxRelNotas from "./BoxRelNotas";
//import BoxGraph from "./BoxGraph";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IMediaPondGrupo } from "./interface";

import BoxGraph from "./BoxGraph";

const PageAgrupMediaPond = () =>{
    const [resultado, setResultado] = useState<IMediaPondGrupo | undefined>(undefined);

    const axiosPrivate = useAxiosPrivate();

    const [opcSelecionadas, setOpcSelecionadas] = useState({
        turma: '',
        disciplina: '',
        simulado: ''
      }); 

    useEffect(()=>{
      //  console.log("opcSelecionadas", opcSelecionadas)
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
                   // console.log("responseMEdiaPondGrupo", responseMediaPondGrupo);
                    setResultado(responseMediaPondGrupo.data)
                   //  console.log("Resultado", resultado);
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
                title={"Agrupamento por média ponderada"}
                subtitle={"Verifique o agrupamento por média ponderada para obter insights mais refinados sobre padrões e tendências nos dados"}
            />

            {resultado !==undefined ? (
                <>
                    <BoxRelNotas 
                        resultado={resultado}
                    />
                    <BoxGraph
                         resultado = {resultado}
                     />
                </>   
            ): <></>}

            
        </section>
    )
}

export default PageAgrupMediaPond