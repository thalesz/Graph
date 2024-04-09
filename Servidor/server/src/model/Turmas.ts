import mongoose, { Document, Schema } from 'mongoose';

interface ITurma extends Document {
  nome: String,
  codigo: String
}

const turmaSchema = new Schema<ITurma>(
  {
    nome:{
        type:String,
        required: true
    }
  },
  { collection: 'Turmas' }
);

const TurmaModel = mongoose.model<ITurma>('Turmas', turmaSchema);

export  {TurmaModel, ITurma};
