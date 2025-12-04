<<<<<<< HEAD
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
=======

🧩 Sistema de Recrutamento – Backend + Frontend

Este projeto é um trabalho acadêmico desenvolvido para a disciplina **Tópicos Especiais em TI**, composto por **uma API RESTful (backend)** e **uma aplicação web (frontend)** para gerenciamento de processos seletivos.

O sistema engloba desde o cadastro de candidatos até o controle de entrevistas, trazendo boas práticas de desenvolvimento, organização de código, tipagem, documentação e integração completa entre frontend e backend.

# 🚀 Funcionalidades do Sistema

### Backend

* Cadastro e gerenciamento de **Candidatos**
* Cadastro e gerenciamento de **Entrevistadores**
* Controle de **Entrevistas**
* Relacionamento entre tabelas com Prisma
* Autenticação com JWT
* Validação de dados com Zod
* Documentação completa com Swagger
* CRUD completo para todos os recursos

### **Frontend**

* Interface web moderna para gerenciamento do sistema
* Fluxos completos para:

  * Cadastro, listagem e edição de candidatos
  * Cadastro, listagem e edição de entrevistadores
  * Cadastro e controle de entrevistas
* Consumo total da API usando Axios
* Layout responsivo
* Feedback ao usuário (Toastify)
* Navegação organizada com React Router

---

# 🛠️ Tecnologias Utilizadas

### Backend

* **TypeScript**
* **Node.js + Express**
* **Prisma ORM**
* **PostgreSQL**
* **Zod** (validações)
* **JWT** (autenticação)
* **bcrypt** (hash de senhas)
* **Swagger** (documentação)
* **dotenv**
* **ts-node-dev**

### Frontend

* **React + Vite**
* **TypeScript**
* **Axios**
* **React Router DOM**
* **React Hook Form**
* **Zod** (validações)
* **Toastify**
* **Lucide Icons**
* **TailwindCSS** (se aplicável)
* **Context API** para autenticação (se existir login)
* Estilização modular

---

# 📁 Estrutura do Projeto

### Monorepo (se estiver no mesmo repositório)

```
/Sistema_de_Recrutamento
 ├── backend
 └── frontend
```

### Backend

```
src/
 ├── routes/
 ├── controllers/
 ├── services/
 ├── schemas/ (Zod)
 ├── prisma/
 ├── middlewares/
 ├── utils/
 └── server.ts
```

### Frontend

```
src/
 ├── pages/
 ├── components/
 ├── services/api.ts
 ├── hooks/
 ├── context/
 ├── layouts/
 ├── utils/
 └── main.tsx
```

---

# ⚙️ Como Executar o Projeto

## 🗂️ 1. Clonar o repositório

```
git clone https://github.com/livmrb/Sistema_de_Recrutamento.git
cd Sistema_de_Recrutamento
```

---

# 🖥️ Backend

## 📦 2. Instalar dependências

```
cd backend
npm install
```

## ⚙️ 3. Configurar variáveis de ambiente

Crie um arquivo **.env** na pasta **backend/**:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/sistema_recrutamento"
PORT=3000
JWT_SECRET="sua_chave_secreta"
```

## 🗄️ 4. Executar migrações

```
npx prisma migrate dev
```

ou

```
npx prisma db push
```

## ▶ 5. Iniciar o servidor

```
npm run dev
```

A API ficará disponível em:
👉 [http://localhost:3000](http://localhost:3000)

Documentação Swagger:
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

# 🌐 Frontend

## 📦 1. Instalar dependências

```
cd frontend
npm install
```

## ⚙️ 2. Configurar URL da API

No arquivo:

```
src/services/api.ts
```

Ajuste a URL:

```ts
export const api = axios.create({
  baseURL: "http://localhost:3000",
});
```

## ▶ 3. Rodar aplicação

```
npm run dev
```

Acesse no navegador:
👉 [http://localhost:5173](http://localhost:5173)


# 🧑‍🎓 Requisitos Atendidos (Backend)

✔ 3+ resources com 5 endpoints cada (GET, GET by ID, POST, PUT, DELETE)
✔ Relacionamentos com chave estrangeira (Entrevista → Candidato/Entrevistador)
✔ GET com include retornando dados relacionados
✔ Swagger documentado
✔ Validações via Zod
✔ Persistência com PostgreSQL + Prisma



Se quiser, posso **gerar uma versão em inglês**, deixar tudo mais visual, incluir **prints do sistema**, ou montar um **modelo de README mais estilizado com badges, emojis e sessões colapsáveis**.
>>>>>>> 32a18f5e67abb246eb0ac3a92a2a992205b195f9
