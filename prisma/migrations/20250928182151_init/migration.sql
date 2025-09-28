-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Candidato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "curriculoURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Entrevistador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Entrevista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "observacoes" TEXT,
    "candidatoId" INTEGER NOT NULL,
    "entrevistadorId" INTEGER NOT NULL,
    CONSTRAINT "Entrevista_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Entrevista_entrevistadorId_fkey" FOREIGN KEY ("entrevistadorId") REFERENCES "Entrevistador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_email_key" ON "Candidato"("email");
