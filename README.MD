<h1 align="center">API RESTful para Gerenciamento de Tarefas ✔️</h1> 
  <h3 align="center">Desafio Monitoria de Engenharia de Software - 2025.1 CIn/UFPE - Desafio Backend</h3>

<p align="center">
    <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" />    
    <br />
        <a href="https://documenter.getpostman.com/view/40958428/2sAYQWKtWz"><strong>Ir para o Documentação »</strong></a>
    <br />
</p>

## Descrição
Esta é uma API RESTful desenvolvida para o gerenciamento de tarefas. Ela permite criar, ler, atualizar e excluir tarefas, além de realizar a filtragem com base no status. A aplicação segue boas práticas de desenvolvimento, com validação de dados, modularização de código e interação com um banco de dados.

## Tecnologias Utilizadas

<div>
        <img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
        <img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"/>
        <img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />
        <img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" />
        <img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/knexjs/knexjs-original.svg" >
        <img width="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" />
</div>

- **JavaScript:** Linguagem principal utilizada no desenvolvimento.
- **Node.js:** Plataforma de execução para JavaScript no lado do servidor.
- **Express:** Framework minimalista para criação de APIs.
- **npm:** Gerenciador de pacotes para instalação de dependências.
- **Knex.js:** Query builder para interagir com o banco de dados de forma eficiente.
- **SQLite:** Banco de dados leve e fácil de configurar.

## 🚀 Início Rápido

Siga as etapas abaixo para configurar e executar o projeto localmente:

### Pré-requisitos

Certifique-se de ter o seguinte instalado na sua máquina:
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

### Passos para Configuração

1. **Clone o repositório:**
```bash
   git clone https://github.com/Mikaell-Miguel-ORG/desafio-es-2025-backend
   cd desafio-es-2025-backend
```
2. **Instale as dependências:**
```bash
   npm install
```
3. **Configure as variáveis de ambiente:**

Crie um arquivo .env na raiz do projeto e adicione as variáveis necessárias. Use o arquivo .env.example como referência:
```bash
  cp .env.example .env
```
4. **Inicie o servidor:**

```bash
  npm run dev
```
5. **Acesse a aplicação:**

O servidor estará disponível em http://localhost:3000 (ou na porta configurada no .env).

## Requisições

### POST /tarefas - Criação de um nova Tarefa
Permite criar uma nova tarefa com as seguintes propriedades:
- **título**: (String, **obrigatório**)
- **descrição**: (String, **opcional**)
- **status**: (String, **obrigatório** – valores possíveis: "pendente", "realizando", "concluída")
- **data_vencimento**: (Data formato yyyy-MM-dd, **opcional**, deve ser uma data válida)

**Exemplo de requisição:**

```url
{endpoint}/tarefas/
```

**Body (JSON)**:
```json
{
  "titulo": "Estudar API",
  "descricao": "Estudar como criar uma API RESTful",
  "status": "pendente",
  "data_vencimento": "2024-12-31"
}
```

### GET /tarefas - Listar todas as tarefas
Retorna todas as tarefas cadastradas no banco de dados.  

**Exemplo de Requisição:**
```url
{endpoint}/tarefas/
```
**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "titulo": "Estudar API",
    "descricao": "Estudar como criar uma API RESTful",
    "status": "pendente",
    "data_vencimento": "2024-12-31"
  },
  {
    "id": 2,
    "titulo": "Finalizar projeto",
    "descricao": "Finalizar o projeto de API",
    "status": "realizando",
    "data_vencimento": "2024-12-25"
  }
]
```

### GET /tarefas/{id} - Buscar uma tarefa por ID 
Permite buscar os detalhes de uma tarefa específica pelo seu ID. 

**Exemplo de Requisição:**
```url
{endpoint}/tarefas/1
```
**Exemplo de resposta:**
```json
{
  "id": 1,
  "titulo": "Estudar API",
  "descricao": "Estudar como criar uma API RESTful",
  "status": "pendente",
  "data_vencimento": "2024-12-31"
}
```

### PUT /tarefas/{id} - Atualizar uma tarefa
Permite atualizar as informações de uma tarefa, como título, descrição, status ou data de vencimento.

**Exemplo de requisição:**
```url
{endpoint}/tarefas/1
```
**Body (JSON):**
```json
{
  "titulo": "Estudar API - Revisão",
  "descricao": "Revisar os conceitos de API RESTful",
  "status": "realizando",
  "data_vencimento": "2024-12-28"
}
```

### DELETE /tarefas/{id} - Deletar uma tarefa
Permite a remoção de uma tarefa pelo seu ID.

**Exemplo de requisição:**
```
{endpoint}/tarefas/1
```

### GET /tarefas?status={status} - Filtrar tarefa por status
Permite a filtragem das tarefas com base no status. O parâmetro `status` pode ter os seguintes valores:
- "pendente"
- "realizando"
- "concluída"

**Exemplo de requisição:**
```
{endpoint}/tarefas?status=pendente
```

**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "titulo": "Estudar API",
    "descricao": "Estudar como criar uma API RESTful",
    "status": "pendente",
    "data_vencimento": "2024-12-31"
  }
]
```
