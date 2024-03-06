import mongoose, { Document, ObjectId, Schema } from 'mongoose';
interface IAluno extends Document {
    nome: string;
    codigo: string;
    grupo: string;
    id_turmas: string;

}

const alunosSchema = new Schema<IAluno>(
  {
    nome:{
        type:String,
        required:true
    },
    codigo:{
        type:String,
        required:true
    },
    grupo:{
        type:String,
        required:true
    },
    id_turmas:{
        type:String,
        required:true
    }
  },
  { collection: 'Alunos' }
);

const AlunoModel = mongoose.model<IAluno>('Alunos', alunosSchema);

export  {AlunoModel, IAluno};