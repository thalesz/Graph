import mongoose, {Document, Schema, Types, ObjectId} from "mongoose";

interface IQuestoes extends Document{
    _id: ObjectId,
    enunciado:String,
}

const questoesSchema = new Schema<IQuestoes>(
    {
      enunciado:{
          type:String,
          required:true
      }
    },
    { collection: 'Questões' }
  );
  
  const QuestaoModel = mongoose.model<IQuestoes>('Questões  ', questoesSchema);
  
  export  {QuestaoModel, IQuestoes};
  