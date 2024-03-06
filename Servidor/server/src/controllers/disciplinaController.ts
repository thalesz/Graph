import { Request, Response } from 'express';
import { DisciplinaModel as Disciplinas, IDisciplina } from '../model/Disciplina';
import mongoose from 'mongoose';
//import { UserModel as User, IUser } from '../model/User';

const getAllDisciplina = async (req: Request, res: Response) => {
    try {
        const { selectTurmaId } = req.query;

    //    console.log("entrei aquiaaaaaaaaaaaaa")
        const objectIdSelectTurmaId = new mongoose.Types.ObjectId(selectTurmaId as string);

        // Now you can use objectIdSelectTurmaId in your Mongoose query
        const disciplinas = await Disciplinas.find({ id_turma: objectIdSelectTurmaId });
        res.json(disciplinas);
    } catch (error) {
      console.error('Error retrieving disciplinas:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
  
export {
    getAllDisciplina
};
