import { isDisabled } from '@testing-library/user-event/dist/utils';
import React from 'react';

interface SelectGenericoProps {
    label: string;
    options: any[]; // ou um tipo mais específico para suas opções
    select: string;
    setSelect: React.Dispatch<React.SetStateAction<string>>;
}

const SelectGenerico: React.FC<SelectGenericoProps> = ({ label, options, select, setSelect }) => {
    const handleSelectChange = (e:any) => {
        setSelect(e.target.value);
        console.log(select);
    };

    return (
      <div className="select-container">
        <label>{label}</label>
        <select  disabled={!options || options.length === 0} onChange={handleSelectChange}>
          <option value="">
            Selecione uma opção
          </option>

          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}

        </select>
      </div>
    );
};

export default SelectGenerico;
  