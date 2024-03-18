import mongoose, {Document, Schema, Types, ObjectId} from "mongoose";

interface IDuvidas extends Document{
    _id: ObjectId,
    duvida:String,
    id_aluno:ObjectId,
    id_questao:ObjectId 
}

const duvidasSchema = new Schema<IDuvidas>(
    {
      duvida:{
        type:String,
        required:true
      },
      id_aluno:{
        type:Types.ObjectId,
        required:true
      },
      id_questao:{
        type:Types.ObjectId,
        required:true
      }
    },
    { collection: 'Duvidas' }
  );
  
  const DuvidaModel = mongoose.model<IDuvidas>('Duvidas', duvidasSchema);
  
  export  {DuvidaModel, IDuvidas};
  