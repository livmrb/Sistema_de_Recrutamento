-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Candidato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "curriculoURL" TEXT NOT NULL,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Entrevistador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "Entrevistador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Entrevista" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "observacoes" TEXT,
    "candidatoId" INTEGER NOT NULL,
    "entrevistadorId" INTEGER NOT NULL,

    CONSTRAINT "Entrevista_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_email_key" ON "public"."Candidato"("email");

-- AddForeignKey
ALTER TABLE "public"."Entrevista" ADD CONSTRAINT "Entrevista_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "public"."Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Entrevista" ADD CONSTRAINT "Entrevista_entrevistadorId_fkey" FOREIGN KEY ("entrevistadorId") REFERENCES "public"."Entrevistador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
