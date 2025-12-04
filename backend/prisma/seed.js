const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.usuario.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      nome: 'Admin',
      senha: 'admin',
    },
    create: {
      nome: 'Admin',
      email: 'admin@admin.com',
      senha: 'admin',
    },
  });

  console.log('Usuario admin garantido:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
