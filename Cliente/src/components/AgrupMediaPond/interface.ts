import SingleAlunoSelect from "../DuvidaPorQuestao/SingleAlunoSelect";

// types.ts
export interface opcSelecionadasProps {
    opcSelecionadas: {
      turma: string;
      disciplina: string;
      simulado: string;
    };
  }

  export interface clickedProps {
    clicked: {
      questao:string,
      aluno:string,
      grupo:string,
      duvida:string
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
  notaAluno: number[][];
}

export interface SearchbynameProps {
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
  textInput: string;
  children?: React.ReactNode; // Adicione essa linha

}

export interface SortNameValueProps{
  setSortValue:React.Dispatch<React.SetStateAction<string>>;
  sortValue:string;
}

export interface ColorMap {
  [key: string]: string;
}

export interface IDuvidas{
  _id: string;
  id_questao:string
  id_aluno:string
  duvida: string
  nome_aluno:string
}
export interface IQuestoes{
  _id:string
  enunciado:string
}


export interface IDuvidaQuestaoAlunos {
  duvidas: IDuvidas[]; // Mudança no nome da propriedade
  questoes: IQuestoes[];
  alunos: IAluno[]
}

export interface FeedAndSeachPageProps{
  resultado: IDuvidaQuestaoAlunos|undefined;
  // setResultadoFiltrado: React.Dispatch<React.SetStateAction<IDuvidaQuestaoAlunos>>|undefined;
  setResultadoFiltrado: React.Dispatch<React.SetStateAction<IDuvidaQuestaoAlunos | undefined>>;
  alunoSelec:string[];
  setAlunoSelec: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode; // Adicione essa linha
}

export interface FeedAlunoProps{
  alunos: IAluno[];
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
  alunoSelec:string[];
  setAlunoSelec: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode; // Adicione essa linha



}

export interface SingleAlunoSelectProps{
  aluno: IAluno;
  alunoSelec:string[];
  setAlunoSelec: React.Dispatch<React.SetStateAction<string[]>>;
  setTextInput: React.Dispatch<React.SetStateAction<string>>;


}


export interface selectGrupoProps{
  grupos: string[];
  setGrupoSelect:React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode; // Adicione essa linha

}

export interface PageGraphProps{
  resultado: IDuvidaQuestaoAlunos|undefined;
  alunoSelec:string[];
}
export interface Graph01Props{
  questoes:IQuestoes[]
  duvidas:IDuvidas[]
}
export interface Props {
  duvidas: IDuvidas[];
  questoes: IQuestoes[];
  alunos: IAluno[];
}

export interface BoxDuvidaRespostaProps{
  duvidas: IDuvidas[];
  questoes: IQuestoes[];
  alunos: IAluno[];
  setClicked: any;
}