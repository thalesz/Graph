import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Item, TableListAlunoSelectProps } from '../0. Interface/metricasInterface';
import useCheckboxSelection from '../../hooks/useCheckboxSelection';

const TableAlunoSelect: React.FC<TableListAlunoSelectProps> = ({ resultado, alunosMarcados, setAlunosMarcados }) => {
    // Use o hook useCheckboxSelection
    const {  handleCheckboxChange } = useCheckboxSelection(setAlunosMarcados, alunosMarcados);

    if (!resultado || resultado.length === 0) {
        return <div className='text'>Nenhum dado disponível.</div>;
    }

    return (
        <div className="table-wrapper">
            <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Aluno</th>
                            <th>Grupo</th>
                            <th>Código</th>
                            {Object.keys(resultado[0]).map((key: string) => {
                                // Renderiza o nome da chave como cabeçalho da tabela
                                if (key !== 'aluno') {
                                    const formattedKey = key === 'compreensao' ? 'Compreensão' : (key === 'mediaPonderada' ? 'Média Ponderada' : (key === 'mediaNormal' ? 'Média Normal' : key.charAt(0).toUpperCase() + key.slice(1)));
                                    return (
                                        <th key={key}>{formattedKey}</th>
                                    );
                                }
                                return null;
                            })}



                        </tr>
                    </thead>
                    <tbody className='tableBody'>
                        {resultado && resultado.map((item: any, index: any) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(item.aluno._id)}
                                        checked={alunosMarcados.includes(item.aluno._id.toString())}
                                    />
                                </td>
                                <td>{item.aluno.nome}</td>
                                <td>{item.aluno.grupo}</td>
                                <td>{item.aluno.codigo}</td>
                                {Object.keys(item).map((key: string) => {
                                    // Verifica se a chave não é 'aluno'
                                    if (key !== 'aluno') {
                                        // Exibe o valor da propriedade
                                        return (
                                            <td key={key}>{item[key]}</td>
                                        );
                                    }
                                    return null;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </div>
    
    );
};

export default TableAlunoSelect;
