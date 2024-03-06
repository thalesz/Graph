// types.ts
export interface opcSelecionadasProps {
    opcSelecionadas: {
      turma: string;
      disciplina: string;
      simulado: string;
    };
  }

export interface IAluno {
  nome: string;
  _id: string;
  grupo: string;
}

export interface IMediaPondGrupo {
  alunos: IAluno[];
  mediaPonds: string[]; // Mudança no nome da propriedade
}
