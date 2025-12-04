import { Request, Response } from 'express';
import prisma from '../config/prisma';

export default {
  async findAll(req: Request, res: Response) {
    const entrevistadores = await prisma.entrevistador.findMany();
    res.json(entrevistadores);
  },

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const entrevistador = await prisma.entrevistador.findUnique({ where: { id } });
    if (!entrevistador) return res.status(404).json({ error: 'Entrevistador não encontrado' });
    res.json(entrevistador);
  },

  async create(req: Request, res: Response) {
    const novo = await prisma.entrevistador.create({ data: req.body });
    res.status(201).json(novo);
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const atualizado = await prisma.entrevistador.update({
      where: { id },
      data: req.body,
    });
    res.json(atualizado);
  },

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await prisma.entrevistador.delete({ where: { id } });
    res.status(204).send();
  },
};
