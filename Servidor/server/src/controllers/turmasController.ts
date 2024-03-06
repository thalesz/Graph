import { Request, Response } from 'express';
import { TurmaModel as Turma, ITurma } from '../model/Turmas';
import { UserModel as User, IUser } from '../model/User';

const getAllTurmas = async (req: Request, res: Response) => {
    const turmas = await Turma.find()
    if (!turmas) return res.status(204).json({ 'message': 'No turmas found' });
    res.json(turmas);
    //console.log("oiii", turmas)
};

const deleteTurma = async (req: Request, res: Response) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Turma ID required' });
    const turma = await Turma.findOne({ _id: req.body.id }).exec();
    if (!turma) {
        return res.status(204).json({ 'message': `Turma ID ${req.body.id} not found` });
    }
    const result = await turma.deleteOne({ _id: req.body.id });
    res.json(result);
};

const getTurma = async (req: Request, res: Response) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Turma ID required' });
    const turma = await Turma.findOne({ _id: req.params.id }).exec();
    if (!turma) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(turma);
};

export {
    getAllTurmas,
    deleteTurma,
    getTurma
};
