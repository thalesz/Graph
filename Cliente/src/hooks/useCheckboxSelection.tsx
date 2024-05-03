import { useState } from 'react';

const useCheckboxSelection = (setAlunosMarcados:any, alunosMarcados:any) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleCheckboxChange = (itemId: string) => {
        // Verifica se o item já está selecionado
        const isSelected = alunosMarcados.includes(itemId);
        console.log("issekectde", isSelected)
        
        // Atualiza o estado com base na seleção/deseleção do checkbox
        if (isSelected) {
           setAlunosMarcados(alunosMarcados.filter((id: string) => id !== itemId));

        } else {
           setAlunosMarcados([...alunosMarcados, itemId]);
        }
        console.log("Select", alunosMarcados)
        // setAlunosMarcados(selectedItems)
    };

    return {

        handleCheckboxChange
    };
};

export default useCheckboxSelection;
