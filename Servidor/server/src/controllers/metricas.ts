import { Request, Response } from 'express';
import { SimuladoModel as Simulado, ISimulado } from '../model/Simulados';
import { AlunoModel as Aluno } from '../model/Alunos';
import { NotaModel as Nota } from '../model/Notas';

import { CompreensaoModel as Compreensao } from '../model/Compreensao';
import { AssertividadeModel as Assertividade } from '../model/Assertividade';
import mongoose from 'mongoose';



//import { UserModel as User, IUser } from '../model/User';

const getAllMetricas = async (req: Request, res: Response) => {
  //  const ObjectID = mongoose.Types.ObjectId;

    try {
      
      //console.log("entrei aqui");
      const { selectTurmaId} = req.query;
      const { selectDisciplinaId } = req.query;
      const {selectSimuladoId} = req.query;
      
      //console.log("selectTurmaCode", selectTurmaId);
      if (!selectTurmaId || !selectDisciplinaId || !selectSimuladoId) {
        return res.status(400).json({ message: 'Turma code is required' });
      }

      const objectIdSelectTurmaId = new mongoose.Types.ObjectId(selectTurmaId as string);
      const objectIdSelectDisciplinaId = new mongoose.Types.ObjectId(selectDisciplinaId as string);
      const objectIdSelectSimuladoId = new mongoose.Types.ObjectId(selectSimuladoId as string);


      
      const assertividadeFiltradas = await Assertividade.find({ id_simulado: objectIdSelectSimuladoId });
      const compreensaoFiltrada = await Compreensao.find({ id_simulado: objectIdSelectSimuladoId });
      const alunosTurma = await Aluno.find({ id_turmas: { $in: [objectIdSelectTurmaId] } });

      const alunosIdsAssertividade = new Set(assertividadeFiltradas.map(assertividade => assertividade.id_aluno.toString()));
      const alunosIdsCompreensao = new Set(compreensaoFiltrada.map(compreensao => compreensao.id_aluno.toString()));
      const alunosComInformacoes = [];

      for (const aluno of alunosTurma) {

        const possuiCompreensao = alunosIdsCompreensao.has(aluno._id.toString());
        const compreensaoAluno = possuiCompreensao ? compreensaoFiltrada.find(compreensao =>  compreensao.id_aluno.toString() === aluno._id.toString()) : null;
        const comp = compreensaoAluno ? compreensaoAluno.compreensao : null;
      
        const possuiAssertividade = alunosIdsAssertividade.has(aluno._id.toString());
        const assertividadeAluno = possuiAssertividade ? assertividadeFiltradas.find(assertividade => assertividade.id_aluno.toString()===aluno._id.toString() ):null
        const assert = assertividadeAluno? assertividadeAluno.assertividade:null;
        const infoAluno = {
          aluno: aluno,
          compreensao: comp,
          assertividade: assert
        }
        alunosComInformacoes.push(infoAluno);
      }
      console.log("Alunos com informações", alunosComInformacoes);
      res.json(alunosComInformacoes)
        
    } catch (error) {
      console.error('Error retrieving simulados:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


 export {
        getAllMetricas
//     getAllTurmas,
//     deleteTurma,
//     getTurma
 };
