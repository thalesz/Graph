import { IMediaPondGrupo } from "./interface";
import GraficoMediasPonderadas from "./GrapicoMediasPonderadas";
import Header from "./Header";
import GraphLegend from "./GraphLegend";
import { useState } from "react";

const BoxGraph: React.FC<{ resultado: IMediaPondGrupo|any }> = ({ resultado }) => {

  const [checked, setChecked] = useState(''); // Adicione um estado para controlar o checked do input


  return (
    <section className="BoxForm">
      <div className="header-and-util-wrapper">
          <Header
            title={"Média Ponderada do Alunos"}
            subtitle={"Gráfico das médias finais dos alunos"}
          ></Header>
      </div>
      <GraficoMediasPonderadas data={resultado} />
      <div className='utilGraph'>
            {resultado?(
                 <div className="Legend" >
                 <GraphLegend></GraphLegend>
               </div>
            ): <></>}
                         
                          {/* <div className='graphbtn'>
                          
                          <input
                            type="button"
                            id="ordem"
                            name="ordem"
                            className='botao-menu '
                            //value={checked}
                            //checked={handleRadioChange}
                            value={!checked ? 'Por Grupo' : 'Nome'}
                            onClick={handleRadioChange}
                          /> */}
                            {/* {showLabel&&(
                                <label htmlFor="ordem" id='txtbtn'>
                                  {!checked ? 'Exibindo por nome' : 'Exibindo por Grupo'}
                                </label>
                                )
                            } */}
                            
                        {/* </div> */}
                    </div>
    </section>
  );
}

export default BoxGraph;
