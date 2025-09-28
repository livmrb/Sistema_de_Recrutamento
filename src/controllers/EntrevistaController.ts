import { Request, Response } from 'express';
import prisma from '../config/prisma';

export default {
  async findAll(req: Request, res: Response) {
    const entrevistas = await prisma.entrevista.findMany({
      include: {
        candidato: true,
        entrevistador: true,
      },
    });
    res.json(entrevistas);
  },

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const entrevista = await prisma.entrevista.findUnique({
      where: { id },
      include: {
        candidato: true,
        entrevistador: true,
      },
    });
    if (!entrevista) return res.status(404).json({ error: 'Entrevista não encontrada' });
    res.json(entrevista);
  },

  async create(req: Request, res: Response) {
    const nova = await prisma.entrevista.create({ data: req.body });
    res.status(201).json(nova);
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const atualizada = await prisma.entrevista.update({
      where: { id },
      data: req.body,
    });
    res.json(atualizada);
  },

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await prisma.entrevista.delete({ where: { id } });
    res.status(204).send();
  },
};
