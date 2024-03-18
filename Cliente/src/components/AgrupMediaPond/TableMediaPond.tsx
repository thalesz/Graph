import React from 'react';
import { IMediaPondGrupo } from "./interface";

const TableMediaPond: React.FC<IMediaPondGrupo | any> = ({ resultado }) => {
    if (!resultado || resultado.alunos.length === 0) {
      return <div className='text'>Nenhum dado disponível.</div>;
    }

  return (
    <div className='divTableContainer'>
      <table className='tableMediaPond'>
        <thead className='tableHead'>
          <tr>
            <th>Aluno</th>
            <th>Grupo</th>
            <th>Notas</th>
            <th>Média Ponderada</th>
          </tr>
        </thead>
        <tbody className='tableBody'>
          {resultado.alunos.map((aluno: any, index: any) => (
            <tr key={index}>
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
      </table>
    </div>
  );
}

export default TableMediaPond;
