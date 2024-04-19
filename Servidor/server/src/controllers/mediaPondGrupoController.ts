import { Request, Response } from 'express';
import { SimuladoModel as Simulado, ISimulado } from '../model/Simulados';
import { AlunoModel as Aluno } from '../model/Alunos';
import { NotaModel as Nota } from '../model/Notas';
import mongoose from 'mongoose';
//import { UserModel as User, IUser } from '../model/User';

const getAllMediaPondGrupo = async (req: Request, res: Response) => {
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


    //  console.log("")
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


      // ...

// Calculate weighted average for each student
    // ...

// Calculate weighted average for each student
  const resultados = AlunosFiltrados.map(aluno => {
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

    // Return relevant information
    return {
      nome: aluno.nome, // Change this to the actual property name in your Aluno model
      _id: aluno._id,
      grupo: aluno.grupo, // Change this to the actual property name in your Aluno model
      codigo:aluno.codigo,
      media_ponderada: weightedAverage.toFixed(2), // Adjusted for 2 decimal places
      notas: notasDoAluno.map(nota => ({ valor: nota.valor })),

    };
  });

  // Creating the final object in the format of the IMediaPondGrupo interface
  const resultadoFinal = {
    alunos: resultados.map(result => ({ nome: result.nome, _id: result._id, grupo: result.grupo, codigo:result.codigo })),
    mediaPonds: resultados.map(result => result.media_ponderada),
    notaAluno: resultados.map(result => result.notas) 
  };

  console.log(resultadoFinal);
  res.json(resultadoFinal)
        
    } catch (error) {
      console.error('Error retrieving simulados:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


 export {
        getAllMediaPondGrupo
//     getAllTurmas,
//     deleteTurma,
//     getTurma
 };
