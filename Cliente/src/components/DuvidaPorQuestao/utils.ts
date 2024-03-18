import { IAluno, IDuvidas, IQuestoes } from "../AgrupMediaPond/interface";

export const duvidaPorQuestao = (questoes: IQuestoes[], duvidas: IDuvidas[], alunos: IAluno[]) => {
    const gruposDosAlunos: string[] = [];
    
    // Extrair grupos únicos
    alunos.forEach(aluno => {
      if (!gruposDosAlunos.includes(aluno.grupo)) {
        gruposDosAlunos.push(aluno.grupo);
      }
    });
  
    const duvidasPorQuestao = questoes.map((questao) => {
      const duvidasDaQuestao = duvidas.filter((duvida) => duvida.id_questao === questao._id);
      const alunosComDuvidas = duvidasDaQuestao.map((duvida) => {
        const aluno = alunos.find((aluno) => aluno._id === duvida.id_aluno);
        return aluno ? aluno.nome : ''; // Retorna nome do aluno ou uma string vazia se não encontrar
      });
      return { questao: questao._id, duvidasCount: duvidasDaQuestao.length, alunosComDuvidas };
    });
  
    const contagemDeDuvidasPorQuestao = duvidasPorQuestao.map(item => item.duvidasCount);
    const nomesDosAlunosPorQuestao = duvidasPorQuestao.map(item => item.alunosComDuvidas);
    console.log("nome dos alunos por questao", nomesDosAlunosPorQuestao)
    console.log("grupo dos alunos",gruposDosAlunos)
    return { contagemDeDuvidasPorQuestao, nomesDosAlunosPorQuestao, gruposDosAlunos };
  };
  