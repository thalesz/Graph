import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { QuestaoModel as Questao } from '../model/Questoes';
import { DuvidaModel as Duvida } from '../model/Duvidas';
import { AlunoModel as Aluno } from '../model/Alunos';
const getQuestoesDuvidasAlunos = async (req: Request, res: Response) => {
    try{
        const { selectTurmaId} = req.query;
        const { selectDisciplinaId } = req.query;
        const {selectSimuladoId} = req.query;
        
        //console.log("selectTurmaCode", selectTurmaId);
        if (!selectTurmaId || !selectDisciplinaId || !selectSimuladoId) {
          return res.status(400).json({ message: 'Turma code is required' });
        }
  
        const objectIdSelectTurmaId = new mongoose.Types.ObjectId(selectTurmaId as string);
        const objectIdSelectDisciplinaId = new mongoose.Types.ObjectId(selectDisciplinaId as string);
        const objectIdSelectSimuladoId = new mongoose.Types.ObjectId(selectSimuladoId as string);


        const questoesFiltradas = await Questao.find({ 
            $and: [
                { id_turma: objectIdSelectTurmaId },
                { id_disciplina: { $eq: objectIdSelectDisciplinaId } },
                { id_simulado: { $eq: objectIdSelectSimuladoId  } },
                ]
              }
            );
        const Alunos = await Aluno.find(
            // { id_turmas: objectIdSelectTurmaId }
        );
        // console.log("OLhannnn achamos uma questao", questoesFiltradas)
        const questaoIds = questoesFiltradas.map(questao => questao._id);
        // console.log("idquestao",)
        const duvidasFiltradas = await Duvida.find({ id_questao: { $in: questaoIds } });
        // console.log("OLhannnn achamos uma duvida", duvidasFiltradas)

        const alunosIds = duvidasFiltradas.map(duvida => duvida.id_aluno);

        // console.log("alunosidss", alunosIds)
        const AlunosFiltrados =await Aluno.find({_id:{$in:alunosIds}})
        // console.log("Alunos, gi", AlunosFiltrados)
        // console.log("vudivdas", duvidasFiltradas)

        const resultados = duvidasFiltradas.map((duvida)=>{
          const matchingAluno = AlunosFiltrados.find((aluno) => {
            return aluno._id.toString() === duvida.id_aluno.toString();
          });
          const id_aluno = matchingAluno?.id
          const nome = matchingAluno?.nome

          // console.log("noem?", matchingAluno)
          return{
            _id: duvida._id,
            id_aluno: id_aluno,
            //  nome:nome,
            duvida: duvida.duvida,
            id_questao:duvida.id_questao
          }
        })
        // const AlunosTurma = Aluno.map((aluno:any)=>{
        //   // console.log("noem?", matchingAluno)
        //   return{
        //     nome: aluno.nome,
        //     _id: aluno._id,
        //     grupo: aluno.grupo,
        //   }
        // })
        // console.log("resultados", resultados)
        const resposta = {
          questoes: questoesFiltradas,
          duvidas: resultados,
          alunos: Alunos
        }

        console.log("Resposta?", resposta)
        res.json(resposta)
        // console.log("Tenhos Alunos kkk", AlunosFiltrados)



        // const questoesFiltradas = await Questao.find({ 
        //     $and: [
        //         { id_turma: objectIdSelectTurmaId },
        //         { id_disciplina: { $eq: objectIdSelectDisciplinaId } },
        //         { id_simulado: { $eq: objectIdSelectSimuladoId  } },
        //         ]
        //       }
        //     );
    }catch(err){
        console.error('Error retrieving:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

export {getQuestoesDuvidasAlunos}