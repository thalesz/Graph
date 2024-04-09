import React from 'react';
import Table from 'react-bootstrap/Table';
import SelectSingleAluno from './SelectSingleAluno';
import { ListByNameProps } from './interfaceBoxDuvPerQuestao';

const ListByName: React.FC<ListByNameProps> = ({ alunos, setTextInput, alunoSelec, setAlunoSelec }) => {
  return (
    <section>
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Aluno</th>
              <th>Grupo</th>
            </tr>
          </thead>
          <tbody className="tbodyy">
            {alunos.map((aluno) => (
              <tr className={`${alunoSelec.includes(aluno._id) ? 'ativo' : ''}`} key={aluno._id}>
                <td>
                  <SelectSingleAluno
                    aluno={aluno}
                    alunoSelec={alunoSelec}
                    setAlunoSelec={setAlunoSelec}
                    setTextInput={setTextInput}
                  ></SelectSingleAluno>
                </td>
                <td>{aluno.nome}</td>
                <td>{aluno.grupo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default ListByName;
