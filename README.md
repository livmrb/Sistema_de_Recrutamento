# Sistema de Recrutamento - API Backend

Este projeto é um **trabalho acadêmico** desenvolvido para compor parte da nota da disciplina **Tópicos Especiais em TI**, com foco na construção de uma **API REST** para um sistema de recrutamento, utilizando tecnologias modernas do ecossistema **TypeScript**.

## Objetivo

Desenvolver uma API backend simples para um sistema de recrutamento.

## Tecnologias utilizadas

- Linguagem: TypeScript
- Servidor / Framework web: Node.js + Express
- Validação de dados: Zod
- ORM / acesso ao banco: Prisma
- Banco de dados: SQLite
- Documentação da API: Swagger (via swagger-ui-express)
- Gerenciamento de variáveis de ambiente: dotenv
- Autenticação / segurança: JSON Web Token (JWT), bcrypt (ou similar)
- Ferramenta de desenvolvimento: ts-node-dev (para recarga automática em ambiente de desenvolvimento)

## Como executar / rodar o projeto

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
Crie um arquivo .env com as chaves necessárias:
  ```bash
  DATABASE_URL="file:./dev.db"
  ```

4. **Executar migrações / sincronizar banco**
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
6. **Acessar no navegador** 
 ```bash
  http://localhost:3000
 
