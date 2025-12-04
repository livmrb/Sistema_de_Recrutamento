# Sistema de Recrutamento
API e Frontend completos para gerenciamento de vagas, candidatos e aplicações, utilizando Node.js, Express, TypeScript, Prisma, PostgreSQL, Zod, Swagger e React. <br>

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
- Backend: Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, Zod, Swagger
- Frontend: React + Vite, TypeScript, Axios, Zod, React Hook Form

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

# Recursos da API (3 Resources exigidos)
- Vagas (/vagas): GET, GET/:id, POST, PUT/:id, DELETE/:id
- Candidatos (/candidatos): GET, GET/:id, POST, PUT/:id, DELETE/:id
- Aplicações (/aplicacoes): GET, GET/:id, POST, PUT/:id, DELETE/:id -> Possui relação com Vagas e Candidatos através de vagaId e candidatoId

# Relações no Prisma
Model de exemplo:
- Aplicacao { id, candidatoId, vagaId, relação com Candidato e Vaga }

# Exemplo de GET com include (Requisito 3)
const aplicacoes = await prisma.aplicacao.findMany({ <br>
include: { candidato: true, vaga: true } <br>
}); <br>

# Documentação Swagger
A API possui Swagger completo com schemas, models, endpoints, exemplos de entrada e saída e mensagens de erro. <br><br>

Acessível em: /api-docs <br>

# Validação com Zod
- Exemplo de schema:
export const criarVagaSchema = z.object({ <br>
titulo: z.string().min(3), <br>
descricao: z.string(), <br>
salario: z.number().positive() <br>
}); <br>
Todas as rotas usam validação Zod em middleware. <br>

# PostgreSQL + Prisma
- Criar tabelas: npx prisma migrate dev 
- Abrir Prisma Studio: npx prisma studio

# Deploy (Requisito da atividade)
- Backend Deploy: https://
- Frontend Deploy: https://
- Banco PostgreSQL: https://

# Integração Front ↔ Back
O frontend usa Axios configurado com baseURL do backend.<br> <br>
Exemplo:
export const api = axios.create({ baseURL: "https://seu-backend.com <br>
" }); <br>
await api.post("/vagas", dadosValidados); <br>

# Funcionalidades exigidas (todas atendidas)
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

# Vídeo de Demonstração 

...

# Como Rodar o Projeto Localmente

- Backend:
cd backend <br>
npm install <br>
npx prisma migrate dev <br>
npm run dev <br>

- Frontend:
cd frontend <br>
npm install <br>
npm run dev <br>