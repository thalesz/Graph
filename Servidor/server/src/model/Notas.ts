import mongoose, { Document, Schema, Types, ObjectId } from 'mongoose';
interface INotas extends Document {
    _id: string;
    peso: number;
    valor: number;
    id_aluno: ObjectId

}

const notasSchema = new Schema<INotas>(
  {
    peso:{
        type:Number,
        required: true
    }, 
    valor:{
        type:Number,
        required:true

    },
    id_aluno:{
        type:Types.ObjectId,
        required:true
    }
  },
  { collection: 'Notas' }
);

const NotaModel = mongoose.model<INotas>('Notas', notasSchema);

export  {NotaModel, INotas};
