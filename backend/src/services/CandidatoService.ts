import prisma from '../config/prisma';

export default {
  findAll: () => prisma.candidato.findMany(),

  findOne: (id: number) => prisma.candidato.findUnique({ where: { id } }),

  create: (data: any) =>
    prisma.candidato.create({
      data: {
        nome: data.nome,
        email: data.email,
        cargo: data.cargo,
        telefone: data.telefone ?? '',
        curriculoURL: data.curriculoURL ?? '',
      },
    }),

  update: (id: number, data: any) =>
    prisma.candidato.update({ where: { id }, data }),

  remove: async (id: number) => {
    await prisma.entrevista.deleteMany({ where: { candidatoId: id } });
    return prisma.candidato.delete({ where: { id } });
  },
};
