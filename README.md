# Sistema de Recrutamento

Aplicacao separada em duas partes independentes:
- **backend/**: API Express + Prisma + Swagger.
- **frontend/**: SPA Vite/React com Tailwind.

## Estrutura
```
backend/
  src/            # Codigo da API (rotas, controllers, middlewares, schemas)
  prisma/         # Schema e migracoes
  package.json    # Scripts e dependencias do backend
frontend/
  src/            # React (paginas, componentes, hooks, services)
  package.json    # Scripts e dependencias do frontend
```

## Como rodar o backend
```
cd backend
npm install
# criar arquivo .env com DATABASE_URL, PORT, JWT_SECRET etc
npx prisma migrate dev   # ou prisma db push
npm run dev              # desenvolvimento
npm run build && npm start
```
Swagger: http://localhost:3000/api-docs

## Como rodar o frontend
```
cd frontend
npm install
npm run dev
# build: npm run build; preview: npm run preview
```

Ajuste a `baseURL` em `frontend/src/services/api.ts` para apontar para o host do backend quando necessario.