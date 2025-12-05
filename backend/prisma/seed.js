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

  // Entrevistadores fixos por cargo
  const entrevistadores = [
    { nome: 'Dr. Roberto Lima', departamento: 'Tecnologia', cargo: 'Tecnologia' },
    { nome: 'Dra. Paula Mendes', departamento: 'RH', cargo: 'RH' },
    { nome: 'Prof. Marcos Oliveira', departamento: 'Design', cargo: 'Design' },
    { nome: 'Ana Carolina Santos', departamento: 'Marketing', cargo: 'Marketing' },
    { nome: 'Carlos Eduardo', departamento: 'Vendas', cargo: 'Vendas' },
    { nome: 'Fernanda Costa', departamento: 'Financas', cargo: 'Financas' },
  ];

  for (const ent of entrevistadores) {
    const existente = await prisma.entrevistador.findFirst({
      where: { nome: ent.nome, cargo: ent.cargo },
    });
    if (existente) {
      await prisma.entrevistador.update({ where: { id: existente.id }, data: ent });
      console.log('Entrevistador atualizado:', existente.id);
    } else {
      const criado = await prisma.entrevistador.create({ data: ent });
      console.log('Entrevistador criado:', criado.id);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
