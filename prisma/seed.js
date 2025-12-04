import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.usuario.create({
    data: {
      nome: "Admin",
      email: "admin@admin.com",
      senha: "123456" // sem hash, simples
    }
  });

  console.log("Usuário criado:", user);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
