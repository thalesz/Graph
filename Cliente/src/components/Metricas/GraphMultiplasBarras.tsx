import React from "react";
import Plot from 'react-plotly.js';
import { IAluno } from "../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao";
import { GraphMultiplasBarrasProps, Item, Itens } from "../0. Interface/metricasInterface";
import useExtractAlunosNumerics from "../../hooks/useExtractAlunosNumerics";

const GraphMultiplasBarras: React.FC<GraphMultiplasBarrasProps> = ({ itens, text }) => {
    const { alunos, traces} = useExtractAlunosNumerics(itens, text);

    if (!itens || itens.length === 0) {
        return <div>No data available.</div>;
    }
    

    return (
        <div className="graph-container">
             <Plot
                data={traces}
                layout={{ 
                    width: 800, 
                    height: 700, 
                    bargap: 0.5,
                    barmode: 'group',
                    xaxis: {
                        title: 'Alunos'
                    },
                    yaxis: {
                        title: 'Valores'
                    },
                    legend: {
                        y: 0.5,
                        font: {
                            family: 'Arial, sans-serif',
                            size: 20,
                            color: 'grey',
                        }
                    }
                }}
            />
        </div>
    );
};

export default GraphMultiplasBarras;
