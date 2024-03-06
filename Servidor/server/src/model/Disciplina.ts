import mongoose, { Document, Schema } from 'mongoose';

interface IDisciplina extends Document {
  _id:string,
  descricao:string
}

const disciplinaSchema = new Schema<IDisciplina>(
  {
    _id:{
        type:String,
        required: true
    }, 
    descricao:{
        type:String,
        required:true
    }
  },
  { collection: 'Disciplinas' }
);

const DisciplinaModel = mongoose.model<IDisciplina>('Disciplinas', disciplinaSchema);

export  {DisciplinaModel, IDisciplina};
