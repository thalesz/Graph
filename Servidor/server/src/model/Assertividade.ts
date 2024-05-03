import mongoose, {Document, Schema, Types, ObjectId} from "mongoose";

interface IAssertividade extends Document{
    _id: ObjectId,
    id_aluno:ObjectId,
    id_simulado:ObjectId,
    assertividade: Number,
}

const assertividadeSchema = new Schema<IAssertividade>(
    {
      assertividade:{
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
    { collection: 'Assertividade' }
  );
  
  const AssertividadeModel = mongoose.model<IAssertividade>('Assertividade', assertividadeSchema);
  
  export  {AssertividadeModel, IAssertividade};
  