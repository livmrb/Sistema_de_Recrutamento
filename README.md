# Sistema de Recrutamento
API e Frontend completos para gerenciamento de vagas, candidatos e aplicações, utilizando Node.js, Express, TypeScript, Prisma, PostgreSQL, Zod, Swagger e React. <br>

Membros do grupo: Amanda Voss, Lívia Maria e Romana Cristina.

# Deploy
- Backend Deploy: https://sistema-de-recrutamento.onrender.com
- Frontend Deploy:https://sistema-de-recrutamento-1.onrender.com

# Vídeo de Demonstração 
- Youtube: https://youtu.be/D7NW5aFv3L8

# Visão Geral
O Sistema de Recrutamento é uma aplicação full-stack que permite: 
- Cadastro, listagem, atualização e remoção de vagas 
- Cadastro de candidatos
- Criação de aplicações (candidato aplicando para vaga)
- Relação vaga → aplicações e candidato → aplicações
- Validação completa com Zod
- Integração entre frontend e backend usando Axios
- Documentação interativa com Swagger
- Banco de dados PostgreSQL via Prisma ORM
- Deploy completo (frontend + backend + banco) na nuvem

# Tecnologias Utilizadas 
- Node.js
- Express.js
- TypeScript 
- Prisma ORM 
- PostgreSQL
- Zod
- Swagger
- React + Vite
- TypeScript
- Axios
- Zod 
- React Hook Form

# Estrutura do Projeto
/backend <br>
/src <br>
/routes <br>
/controllers <br>
/schemas <br>
/services <br>
/prisma <br>
swagger.json <br>
package.json <br><br>

/frontend<br>
/src <br>
/pages <br>
/components <br>
/services <br>
/schemas <br>

# Recursos da API 
- Vagas (/vagas): GET, GET/:id, POST, PUT/:id, DELETE/:id
- Candidatos (/candidatos): GET, GET/:id, POST, PUT/:id, DELETE/:id
- Aplicações (/aplicacoes): GET, GET/:id, POST, PUT/:id, DELETE/:id -> Possui relação com Vagas e Candidatos através de vagaId e candidatoId

# Relações no Prisma
Model de exemplo:
- Aplicacao { id, candidatoId, vagaId, relação com Candidato e Vaga }


# Funcionalidades exigidas
- CRUD para Vagas
- CRUD para Candidatos
- CRUD para Aplicações
- Relações entre tabelas
- GET com include
- Swagger documentado
- Validação com Zod no front e back
- Frontend e backend em TypeScript
- Banco via Prisma + PostgreSQL
- Deploy completo
- Axios para integração


# Como Rodar o Projeto Localmente

- Backend: <br>
cd backend <br>
npm install <br>
npx prisma migrate dev <br>
npm run dev <br>

- Frontend: <br>
cd frontend <br>
npm install <br>
npm run dev <br>
