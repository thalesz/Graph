import { Itens } from "../0. Interface/metricasInterface";
import GraphMultiplasBarras from "./GraphMultiplasBarras";
import { GraphMultiplasBarrasProps } from "../0. Interface/metricasInterface";
import Card from 'react-bootstrap/Card'
import HeaderBts from '../DuvidaPorQuestaoBTS/HeaderBts';
import Utils from "../AgrupMediaPondBTS/Utils";
import { useState } from "react";
import SelectButton from "./SelectButton";
const BoxGraphMetricas: React.FC<GraphMultiplasBarrasProps> = ({itens})=>{
    const [sortValue, setSortValue]=  useState<string>('Dispersão')
    return(
        <section>
            <Card body 
              bg={"secondary"}
              text={"white"}
              className="mb-2 Box2"
            >
            <HeaderBts
            title={"Gráfico"}
            />
        
            <GraphMultiplasBarras
                itens={itens}
                text={sortValue}
            
            ></GraphMultiplasBarras>

            {
                itens !==undefined && (
                    <SelectButton
                        sortValue={sortValue}
                        setSortValue={setSortValue}
                        trueValue="Barras"
                        falseValue="Dispersão"
                        text="Tipo de gráfico: "
                    ></SelectButton>
                )
            }
            
            </Card>
        </section>
    )
}

export default BoxGraphMetricas;