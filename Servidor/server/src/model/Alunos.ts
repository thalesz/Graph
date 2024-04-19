import mongoose, { Document, ObjectId, Schema, Types } from 'mongoose';
interface IAluno extends Document {
    _id: ObjectId
    nome: string;
    grupo: string;
    id_turmas: ObjectId;
    codigo:string;

}

const alunosSchema = new Schema<IAluno>(
  {
    _id:{
        type:Types.ObjectId,
        required:true
    },
    nome:{
        type:String,
        required:true
    },
    grupo:{
        type:String,
        required:true
    },
    codigo:{
        type:String,
        required:true
    },
    id_turmas:{
        type:Types.ObjectId,
        required:true
    }
  },
  { collection: 'Alunos' }
);

const AlunoModel = mongoose.model<IAluno>('Alunos', alunosSchema);

export  {AlunoModel, IAluno};