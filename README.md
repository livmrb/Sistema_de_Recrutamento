# Sistema de Recrutamento
API e Frontend completos para gerenciamento de vagas, candidatos e aplicações, utilizando Node.js, Express, TypeScript, Prisma, PostgreSQL, Zod, Swagger e React.

# Visão Geral
O Sistema de Recrutamento é uma aplicação full-stack que permite:

Cadastro, listagem, atualização e remoção de vagas

Cadastro de candidatos

Criação de aplicações (candidato aplicando para vaga)

Relação vaga → aplicações e candidato → aplicações

Validação completa com Zod

Integração entre frontend e backend usando Axios

Documentação interativa com Swagger

Banco de dados PostgreSQL via Prisma ORM

Deploy completo (frontend + backend + banco) na nuvem

# Tecnologias Utilizadas
Backend: Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, Zod, Swagger
Frontend: React + Vite, TypeScript, Axios, Zod, React Hook Form

# Estrutura do Projeto
/backend
/src
/routes
/controllers
/schemas
/services
/prisma
swagger.json
package.json

/frontend
/src
/pages
/components
/services
/schemas

# Recursos da API (3 Resources exigidos)

Vagas (/vagas): GET, GET/:id, POST, PUT/:id, DELETE/:id

Candidatos (/candidatos): GET, GET/:id, POST, PUT/:id, DELETE/:id

Aplicações (/aplicacoes): GET, GET/:id, POST, PUT/:id, DELETE/:id
• Possui relação com Vagas e Candidatos através de vagaId e candidatoId

# Relações no Prisma
Model de exemplo:
Aplicacao { id, candidatoId, vagaId, relação com Candidato e Vaga }

# Exemplo de GET com include (Requisito 3)
const aplicacoes = await prisma.aplicacao.findMany({
include: { candidato: true, vaga: true }
});

# Documentação Swagger
A API possui Swagger completo com schemas, models, endpoints, exemplos de entrada e saída e mensagens de erro.
Acessível em: /api-docs

# Validação com Zod
Exemplo de schema:
export const criarVagaSchema = z.object({
titulo: z.string().min(3),
descricao: z.string(),
salario: z.number().positive()
});
Todas as rotas usam validação Zod em middleware.

# PostgreSQL + Prisma
Criar tabelas: npx prisma migrate dev
Abrir Prisma Studio: npx prisma studio

# Deploy (Requisito da atividade)
Backend Deploy: https://
Frontend Deploy: https://
Banco PostgreSQL: https://

# Integração Front ↔ Back
O frontend usa Axios configurado com baseURL do backend.
Exemplo:
export const api = axios.create({ baseURL: "https://seu-backend.com
" });
await api.post("/vagas", dadosValidados);

# Funcionalidades exigidas (todas atendidas)
✔ CRUD para Vagas
✔ CRUD para Candidatos
✔ CRUD para Aplicações
✔ Relações entre tabelas
✔ GET com include
✔ Swagger documentado
✔ Validação com Zod no front e back
✔ Frontend e backend em TypeScript
✔ Banco via Prisma + PostgreSQL
✔ Deploy completo
✔ Axios para integração

# Vídeo de Demonstração (Requisito)
O vídeo deve mostrar:

Uso do Swagger

Banco sendo atualizado em tempo real

Frontend consumindo a API

Link do vídeo: https://

# Links Importantes
Frontend Deploy: https://
Backend Deploy: https://
Banco PostgreSQL: https://
Repositório GitHub: https://github.com/livmrb/Sistema_de_Recrutamento

Vídeo da apresentação: https://

# Como Rodar o Projeto Localmente

Backend:
cd backend
npm install
npx prisma migrate dev
npm run dev

Frontend:
cd frontend
npm install
npm run dev