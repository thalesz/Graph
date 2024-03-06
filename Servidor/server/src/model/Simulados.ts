import mongoose, { Document, Schema } from 'mongoose';

interface ISimulado extends Document {
  _id:string,
  descricao:string,
}

const simuladoSchema = new Schema<ISimulado>(
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
  { collection: 'Simulados' }
);

const SimuladoModel = mongoose.model<ISimulado>('Simulados', simuladoSchema);

export  {SimuladoModel, ISimulado};
