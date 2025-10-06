# Sistema de Recrutamento - API Backend
Este projeto é um trabalho acadêmico desenvolvido para a disciplina **Tópicos Especiais em TI**, com foco na construção de uma API RESTful para gerenciamento de processos seletivos. A aplicação foi construída com tecnologias modernas do ecossistema JavaScript/TypeScript e segue boas práticas de organização, validação, documentação e persistência de dados.

## Objetivo
Desenvolver uma API backend robusta para um sistema de recrutamento, com os seguintes recursos:
- Cadastro e gerenciamento de Candidatos
- Gerenciamento de Entrevistadores
- Controle das Entrevistas
- Integração com banco de dados relacional
- Validação de dados
- Documentação completa via Swagger

## Tecnologias utilizadas
- Linguagem: TypeScript
- Framework HTTP: Express.js
- Validação de dados: Zod
- ORM / acesso ao banco: Prisma
- Banco de dados: PostgreSQL
- Documentação da API: Swagger (via swagger-ui-express)
- Variáveis de ambiente: dotenv
- Segurança / Autenticação: JWT, bcrypt
- Desenvolvimento: ts-node-dev

## Requisitos atendidos
Este projeto cumpre **todos os requisitos definidos para a avaliação acadêmica**:
- 3+ Resources com 5 endpoints cada (GET, GET by ID, POST, PUT, DELETE)
- Relacionamento com chave estrangeira (@relation) entre Entrevista, Candidato e Entrevistador
- GET com include retornando dados de tabelas relacionadas
- Swagger documentado para todos os endpoints
- Validações com Zod para corpo da requisição e parâmetros
- Integração com banco PostgreSQL via Prisma

## Como executar o projeto

A seguir um passo a passo:

1. **Clonar o repositório**
  ```bash
  git clone https://github.com/livmrb/Sistema_de_Recrutamento.git
  cd Sistema_de_Recrutamento
  ```
2. **Instalar dependências**
  ```bash
  npm install
  # ou
  yarn install
  ```

3. **Configurar variáveis de ambiente** <br>
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
  ```bash
 # Exemplo para PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/sistema_recrutamento"
PORT=3000
JWT_SECRET="sua_chave_secreta"

  ```

4. **Executar migrações do banco de dados**
  ```bash
  npx prisma migrate dev
  # ou
  npx prisma db push
  ```
  
5. **Iniciar aplicação**
  ```bash
  npm run dev
  # ou
  yarn dev
  ```
6. **Acessar a API**
 ```bash
# A API estará disponível em:
http://localhost:3000
# A documentação Swagger estará em:
http://localhost:3000/api-docs
  ```

 
