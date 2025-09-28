import prisma from '../config/prisma';

export default {
  findAll: () => prisma.candidato.findMany(),

  findOne: (id: number) => prisma.candidato.findUnique({ where: { id } }),

  create: (data: any) => prisma.candidato.create({ data }),

  update: (id: number, data: any) =>
    prisma.candidato.update({ where: { id }, data }),

  remove: (id: number) => prisma.candidato.delete({ where: { id } }),
};
