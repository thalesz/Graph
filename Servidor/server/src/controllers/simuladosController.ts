import { Request, Response } from 'express';
import { SimuladoModel as Simulado, ISimulado } from '../model/Simulados';
import mongoose from 'mongoose';
//import { UserModel as User, IUser } from '../model/User';

const getAllSimuladosByIdTurma = async (req: Request, res: Response) => {
    try {
      
      console.log("entrei aqui");
      const { selectTurmaId} = req.query;
      const { selectDisciplinaId } = req.query;
      
      console.log("selectTurmaCode", selectTurmaId);
      if (!selectTurmaId) {
        return res.status(400).json({ message: 'Turma code is required' });
      }

      
        // Verifique se selectDisciplinaId está presente e é uma string
      const objectIdSelectTurmaId = new mongoose.Types.ObjectId(selectTurmaId as string);
      const objectIdSelectDisciplinaId = new mongoose.Types.ObjectId(selectDisciplinaId as string);

      console.log("objectIdSelectTurmaId", objectIdSelectTurmaId)
      console.log("objectIdSelectDisciplinaId", objectIdSelectDisciplinaId)
      const simuladosFiltrados = await Simulado.find({ 
        id_turmas: objectIdSelectTurmaId,
        id_disciplinas: {$eq: objectIdSelectDisciplinaId}
      });
      console.log("Simulados filtrados:", simuladosFiltrados);
    
    
      res.json(simuladosFiltrados);
      
      // Verifique se o código da turma foi fornecido nos parâmetros da solicitação
      
      
      
    } catch (error) {
      console.error('Error retrieving simulados:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


 export {
        getAllSimuladosByIdTurma
//     getAllTurmas,
//     deleteTurma,
//     getTurma
 };
