import prisma from '../config/prisma';

export default {
  findAll: () =>
    prisma.entrevista.findMany({
      include: {
        candidato: true,
        entrevistador: true,
      },
    }),

  findOne: (id: number) =>
    prisma.entrevista.findUnique({
      where: { id },
      include: {
        candidato: true,
        entrevistador: true,
      },
    }),

  create: (data: any) => prisma.entrevista.create({ data }),

  update: (id: number, data: any) =>
    prisma.entrevista.update({ where: { id }, data }),

  remove: (id: number) => prisma.entrevista.delete({ where: { id } }),
};
