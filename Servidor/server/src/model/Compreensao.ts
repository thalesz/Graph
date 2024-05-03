import mongoose, {Document, Schema, Types, ObjectId} from "mongoose";

interface ICompreensao extends Document{
    _id: ObjectId,
    id_aluno:ObjectId,
    id_simulado:ObjectId,
    compreensao: Number,
}

const compreensaoSchema = new Schema<ICompreensao>(
    {
      compreensao:{
        type:Number,
        required:true
      },
      id_aluno:{
        type:Types.ObjectId,
        required:true
      },
      id_simulado:{
        type:Types.ObjectId,
        required:true
      }
    },
    { collection: 'Compreensão' }
  );
  
  const CompreensaoModel = mongoose.model<ICompreensao>('Compreensão', compreensaoSchema);
  
  export  {CompreensaoModel, ICompreensao};
  