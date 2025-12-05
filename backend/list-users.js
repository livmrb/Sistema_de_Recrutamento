const { PrismaClient } = require('./node_modules/@prisma/client');
const p = new PrismaClient();
(async () => {
  const users = await p.usuario.findMany();
  console.log(users);
  await p.$disconnect();
})();
