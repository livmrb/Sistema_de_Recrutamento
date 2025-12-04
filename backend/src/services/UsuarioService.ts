import prisma from '../config/prisma';

export default {
  findAll: () => prisma.usuario.findMany(),

  findOne: (id: number) => prisma.usuario.findUnique({ where: { id } }),

  create: (data: any) => prisma.usuario.create({ data }),

  update: (id: number, data: any) =>
    prisma.usuario.update({ where: { id }, data }),

  remove: (id: number) => prisma.usuario.delete({ where: { id } }),
};