import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { IMediaPondGrupo } from "../AgrupMediaPond/interface";
import { TableListAlunoSelectProps } from '../DuvidaPorQuestaoBTS/interfaceBoxDuvPerQuestao';


const TableListAlunoSelect: React.FC<TableListAlunoSelectProps> = ({ resultado, alunosMarcados, setAlunosMarcados}) => {


    // useEffect(()=>{
    //     console.log("alunos marcados", alunosMarcados)
    // },[alunosMarcados])

    const handleCheckboxChange = (alunoId: string) => {
        // Verifica se o aluno já está marcado
        const isAlunoMarcado = alunosMarcados.includes(alunoId);
        // Atualiza o estado com base na marcação/desmarcação do checkbox
        if (isAlunoMarcado) {
            setAlunosMarcados(alunosMarcados.filter((id: string) => id !== alunoId));
        } else {
            setAlunosMarcados([...alunosMarcados, alunoId]);
        }
    };

    if (!resultado || resultado.alunos.length === 0) {
        return <div className='text'>Nenhum dado disponível.</div>;
    }
    
    return (
        <section>
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Aluno</th>
                            <th>Grupo</th>
                            <th>Notas</th>
                            <th>Média Ponderada</th>
                        </tr>
                    </thead>
                    <tbody className='tableBody'>
                        {resultado.alunos.map((aluno: any, index: any) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(aluno._id)}
                                        checked={alunosMarcados.includes(aluno._id)}
                                    />
                                </td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.grupo}</td>
                                <td>
                                    <ul>
                                        {resultado.notaAluno[index].map((nota: any, notaIndex: any) => (
                                            <li key={notaIndex}>{nota.valor}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{resultado.mediaPonds[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </section>
    );
}

export default TableListAlunoSelect;
