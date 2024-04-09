import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';



interface SingleSelectBtsoProps {
    label: string;
    options: any[]; // ou um tipo mais específico para suas opções
    select: string;
    setSelect: React.Dispatch<React.SetStateAction<string>>;
}

const SingleSelectBts: React.FC<SingleSelectBtsoProps> = ({ label, options, select, setSelect }) => {
    const handleSelectChange = (e:any) => {
        setSelect(e.target.value);
        console.log(select);
    };

    return (
        <section className='SelectBts'>
            <FloatingLabel controlId="floatingSelect" label={label} >
                <Form.Select aria-label="Default select example" disabled={!options || options.length === 0} onChange={handleSelectChange}>
                    <option value="">
                        Selecione uma opção
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>
        </section>
        

        

    //   <div className="select-container">
    //     <label>{label}</label>
    //     <select  disabled={!options || options.length === 0} onChange={handleSelectChange}>
    //       <option value="">
    //         Selecione uma opção
    //       </option>

    //       {options.map((option, index) => (
    //         <option key={index} value={option.value}>
    //           {option.label}
    //         </option>
    //       ))}

    //     </select>
    //   </div>
    );
};

export default SingleSelectBts;
  