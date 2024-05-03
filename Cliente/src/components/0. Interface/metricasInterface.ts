export interface ResultadoMetricas{
    alunos: IAluno[]
    compreensao: string[],
    assertividade: string[]
 }

 export interface IMediaPondGrupo {
    alunos: IAluno[];
    mediaPonds: string[]; // Mudança no nome da propriedade
    notaAluno: number[][];
}


export interface TableListAlunoSelectProps{
    resultado: Itens | undefined;
    alunosMarcados:string[];
    setAlunosMarcados: React.Dispatch<React.SetStateAction<string[]>>;
    children?: React.ReactNode; // Adicione essa linha
 }


export interface IAluno {
    filter(arg0: (aluno: any) => any): any;
    nome: string;
    _id: string;
    grupo: string;
    codigo:string;    
}

 //referente a generico 
export interface NumericProps {
    [propName: string]: number;
  }
  
export interface Item {
    aluno: IAluno;
    numericProps: NumericProps;
    map: (callbackfn: (value: Item, index: number, array: Item[]) => any, thisArg?: any) => any[];


}
  
export interface Itens {
    reduce: (callbackfn: (keys: string[], item: Item) => string[], initialValue: never[]) => string[];
    filter: (callbackfn: (value: Item, index: number, array: Item[]) => boolean) => Item[];
    [index: number]: Item; // Permitindo acesso por índice numérico
    map: (callbackfn: (value: Item, index: number, array: Item[]) => any, thisArg?: any) => any[];
    length: number;
    slice: (start?: number, end?: number) => Item[];

}

export interface GraphMultiplasBarrasProps{
    itens:  Itens|undefined;
    text: string;
}