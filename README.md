# Projeto de Gráficos Educacionais

Este é um projeto que visa fornecer gráficos educacionais com base nas notas dos alunos. O sistema consiste em uma aplicação cliente e um servidor que se comunicam usando autenticação JWT (JSON Web Token).

## Tecnologias Utilizadas

- **Node.js com TypeScript:** Plataforma de execução de JavaScript que permite executar código TypeScript no lado do servidor.
- **Express:** Framework web para Node.js, utilizado para criar a API do servidor.
- **MongoDB:** Banco de dados NoSQL usado para armazenar dados de forma flexível e escalável.
- **React com TypeScript:** Biblioteca JavaScript para construção de interfaces de usuário, utilizada para o desenvolvimento do aplicativo cliente.

## Funcionalidades

- Autenticação JWT para garantir a segurança das comunicações entre o cliente e o servidor. (feito)
- Implementação de páginas no lado do cliente referente a consulta de media ponderada.(feito).
- Construção de Api referente a turma, disciplina, simulado e aluno(feito)
- Recuperação de notas do aluno do servidor.(feito)
- Cálculo de estatísticas simples, como a média das notas ponderadas. (feito)
- Construção de tabela e gráfico referente a agrupamento de média ponderadas(feito)
- Construção de api referente a questões e dúvidas.(feito)
- Construção da tabela referente a duvidas x alunos e recursos de interatividade. (feito)
- Construção do gráfico referente a duvidas x alunos . (feito) 

## Requisitos

- Node.js
- npm (Node Package Manager)

### Instalação de Dependências

Navegue até o diretório do projeto:

    
    cd Graph
    

Execute o script de instalação:

    
    ./install.sh
    

Certifique-se de conceder permissões de execução ao script se necessário:

    
    chmod +x install.sh 

    Ou
    sudo chmod +x install.sh


   **Nota:** Caso você tenha que executar o comando `chmod +x`, certifique-se de que está no diretório correto.

## Inicialização
- Para iniciar o servidor entre na pasta Servidor/server/src e no terminal utilize o comando npm start
- Para iniciar o cliente entre na pasta Cliente/src e no terminal utilize o comando npm start

