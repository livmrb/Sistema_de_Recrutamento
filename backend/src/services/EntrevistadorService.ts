import prisma from '../config/prisma';

export default {
  findAll: () => prisma.entrevistador.findMany(),

  findOne: (id: number) => prisma.entrevistador.findUnique({ where: { id } }),

  create: (data: any) => prisma.entrevistador.create({ data }),

  update: (id: number, data: any) =>
    prisma.entrevistador.update({ where: { id }, data }),

  remove: (id: number) => prisma.entrevistador.delete({ where: { id } }),
};