export interface HeaderBtsProps{
    title: string;
    children?: React.ReactNode; // Adicione essa linha

}
export interface BoxOneDuvPerQuestaoProps {
    title:string;
    setOpcSelecionadas: (opc: { turma: string; disciplina: string; simulado: string }) => void;  
}

export interface ITurma {
    _id: string;
    nome: string;
    codigo: string;
  }
  
 export  interface ISimulado {
    _id: string;
    descricao: string;
    codigo_disciplina: string[];
    codigo_turmas: string[];
  }
  
  export interface IDisciplina {
    _id: string;
    descricao: string;
  }

  export interface BoxTwoDuvPerQuestaoProps{
    title:string;
    resultado: IDuvidaQuestaoAlunos|undefined;
    alunoSelec:string[];
    setAlunoSelec: React.Dispatch<React.SetStateAction<string[]>>;
    children?: React.ReactNode; // Adicione essa linha

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
  export interface IAluno {
    nome: string;
    _id: string;
    grupo: string;
    codigo:string;
    
  }
  
  export interface IDuvidaQuestaoAlunos {
    duvidas: IDuvidas[]; // Mudança no nome da propriedade
    questoes: IQuestoes[];
    alunos: IAluno[]
  }

  export interface ListSearchDuvPerQuestaoProps{
    resultado: IDuvidaQuestaoAlunos|undefined;
    // setResultadoFiltrado: React.Dispatch<React.SetStateAction<IDuvidaQuestaoAlunos | undefined>>;
    alunoSelec:string[];
    setAlunoSelec: React.Dispatch<React.SetStateAction<string[]>>;
    children?: React.ReactNode; 
  }


  export interface ListByNameProps{
    alunos: IAluno[];
    setTextInput: React.Dispatch<React.SetStateAction<string>>;
    alunoSelec:string[];
    setAlunoSelec: React.Dispatch<React.SetStateAction<string[]>>;
    children?: React.ReactNode; // Adicione essa linha
  }

  export interface SelectSingleAlunoProps{
    aluno: IAluno;
    alunoSelec:string[];
    setAlunoSelec: React.Dispatch<React.SetStateAction<string[]>>;
    setTextInput: React.Dispatch<React.SetStateAction<string>>;
  }

  export interface SearchByNameProps {
    setTextInput: React.Dispatch<React.SetStateAction<string>>;
    textInput: string;
    children?: React.ReactNode; // Adicione essa linha
  }
  
  export interface SelectGrupoProps{
    grupos: string[];
    setGrupoSelect:React.Dispatch<React.SetStateAction<string>>;
    children?: React.ReactNode; // Adicione essa linha
  
  }

  export interface BoxThreeDuvPerQuestaoProps{
    resultado: IDuvidaQuestaoAlunos|undefined;
    alunoSelec:string[];
    children?: React.ReactNode; // Adicione essa linha

  }

  export interface ChartDuvPerQuestaoProps{
    duvidas: IDuvidas[];
    questoes: IQuestoes[];
    alunos: IAluno[];
    setClicked: any;
    grupos: string[];
    children?: React.ReactNode; // Adicione essa linha

  }
  export interface SeriesData {
    questao: string;
    data: number[];
  }
  export interface NomePorGrupo{
    questao:any;
    grupo:any;
    
    nomes:string[];
  }

  export interface BoxListAlunoSelectProps{
    title: string;
    resultado: IDuvidaQuestaoAlunos|undefined;
  }
  
  export interface IMediaPondGrupo {
    alunos: IAluno[];
    mediaPonds: string[]; // Mudança no nome da propriedade
    notaAluno: number[][];
  }
 export interface TableListAlunoSelectProps{
    resultado: IMediaPondGrupo | any;
    alunosMarcados:string[]
    setAlunosMarcados: React.Dispatch<React.SetStateAction<string[]>>;
    children?: React.ReactNode; // Adicione essa linha
 }

 export interface BoxThreeGraphAgrupProps{
  resultado: IMediaPondGrupo | any;
 }