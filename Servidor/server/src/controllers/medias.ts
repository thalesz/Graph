import { Request, Response } from 'express';
import { SimuladoModel as Simulado, ISimulado } from '../model/Simulados';
import { AlunoModel as Aluno } from '../model/Alunos';
import { NotaModel as Nota } from '../model/Notas';

import { CompreensaoModel as Compreensao } from '../model/Compreensao';
import { AssertividadeModel as Assertividade } from '../model/Assertividade';
import mongoose from 'mongoose';



//import { UserModel as User, IUser } from '../model/User';

const getAllMedias = async (req: Request, res: Response) => {
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

      const notasFiltradas = await Nota.find({ 
        $and: [
            { id_turma: objectIdSelectTurmaId },
            { id_disciplina: { $eq: objectIdSelectDisciplinaId } },
            { id_simulado: { $eq: objectIdSelectSimuladoId  } },
            ]
          }
        );
      
      const alunosIds = notasFiltradas.map(nota => nota.id_aluno);
      //console.log("alunosIDs",alunosIds)
      //console.log("notas filtradas", notasFiltradas)
      const AlunosFiltrados = await Aluno.find({ _id: { $in: alunosIds } });
      //console.log("Alunos Filtrados", AlunosFiltrados);

      const alunosComInformacoes = [];

      for (const aluno of AlunosFiltrados) {

        const notasDoAluno = notasFiltradas.filter(nota => nota.id_aluno.toString() === aluno._id.toString());

        // Calculate weighted sum
        const weightedSum = notasDoAluno.reduce((sum, nota) => {
        return sum + nota.valor * nota.peso;
        }, 0);

        // Calculate total weight
        const totalWeight = notasDoAluno.reduce((sum, nota) => {
        return sum + nota.peso;
        }, 0);

        // Calculate weighted average
        const weightedAverage = totalWeight !== 0 ? weightedSum / totalWeight : 0;
        const normalAverage = notasDoAluno.reduce((sum, nota) => {
            return sum + nota.valor;
          }, 0) / notasDoAluno.length;

        const infoAluno = {
          aluno: aluno,
          mediaNormal: Number(normalAverage.toFixed(2)),
          mediaPonderada:  Number(weightedAverage.toFixed(2))
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
        getAllMedias
//     getAllTurmas,
//     deleteTurma,
//     getTurma
 };
