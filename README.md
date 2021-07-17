<p align="center">
  <a href="#Introdução">Introdução</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Tecnologias-e-Ferramentas">Tecnologias</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Estrutura">Estrutura</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Instalação">Instalação</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Comentários-Adicionais">Comentários Adicionais</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

# Introdução

Tweet Analyzer é uma API proposta no desafio prático de back-end da empresa [QR Capital](https://www.qr.capital/pt/) que tem como objetivo analisar tweets sobre bitcoin e retornar a média da opinião do usuário usando o algoritmo [Vader Sentiment](https://github.com/cjhutto/vaderSentiment) e salvando os dados usando [SQLite](https://www.sqlite.org/index.html).

# Tecnologias e Ferramentas

A aplicação foi construída utilizando [Node.js](https://nodejs.org/en/) com [Express](https://expressjs.com/pt-br/).

Para os testes, foi utilizado o [Jest](https://jestjs.io/pt-BR/).

Para padronizar o código e manter a qualidade, foram utilizados, em conjunto: [Editor Config](https://editorconfig.org/), [Prettier](https://prettier.io/) e [ESLint](https://eslint.org/)

Além disso, outras bibliotecas foram utilizadas para auxiliar na implementação das funcionalidades, sendo elas:

[Class Transformer](https://github.com/typestack/class-transformer): Utilizados alguns *decorators* para não trazer informações como data de criação no corpo da resposta.

[Tsyringe](https://www.npmjs.com/package/tsyringe?activeTab=readme): Biblioteca que facilita a injeção de dependências.

[TypeORM](https://typeorm.io/#/): Biblioteca utilizada para facilitar a interação com o banco de dados, aproximando o paradigma do banco de dados ao paradigma da orientação a objetos.

[UUID](https://www.npmjs.com/package/uuid): Universal Unique ID, usado para gerar id's únicos nas entradas no banco.

# Estrutura

*Pasta raíz:* Configurações das ferramentas e bibliotecas.

```
src -> A pasta principal da aplicação, contendo:
dtos (Data transfer objects) -> As interfaces que definem a estrutura dos dados que serão passados para os services;

  modules -> Pasta que abstrai os módulos da aplicação, podendo usar
  como referência as tabelas do banco de dados (cada tabela seria um
  module). Dentro dos **modules** temos a seguinte estrutura:

    infra/http -> Contém os controllers e rotas.
    infra/typeorm -> Contém toda a lógica utilizada em conjunto com o
    Typeorm (Entidades e repositórios), abstraindo o uso da biblioteca
    e não deixando a aplicação dependente dela.

    repositories -> Contém as interfaces que definem a estrutura que
    os repositórios deverão seguir.

    services -> Contém os serviços que são responsáveis por chamar
    os repositórios e pelas regras de negócio da requisição.

    types -> Tipagem de alguns modelos de dados.

  shared -> Pasta que contém os módulos principais e que serão
  compartilhados entre os módulos.

    container -> Contém as dependências que serão injetadas.

    errors -> Contém a estrutura da classe dos erros personalizados.

    A pasta infra já teve sua explicação acima.
```

# Instalação

1 - Clone o projeto;

2 - Execute o comando ```yarn``` para instalar as dependências;

3 - Execute o comando ```yarn dev``` para rodar a aplicação;

4 - É possivel executar ```yarn test``` para executar os testes ou ```yarn test:watch``` para executar ficar observando os testes.

# Comentários Adicionais

1 - Usei o ```synchronize: true``` no banco para agilizar e focar na parte mais importante da aplicação.
