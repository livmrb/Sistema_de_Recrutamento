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
    if (!entrevista) return res.status(404).json({ message: 'Entrevista não encontrada' });
    res.json(entrevista);
  },

  
  async create(req: Request, res: Response) {
    try {
      const nova = await prisma.entrevista.create({ data: req.body });
      res.status(201).json(nova);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar entrevista', error });
    }
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const entrevista = await prisma.entrevista.findUnique({ where: { id } });
    if (!entrevista) return res.status(404).json({ message: 'Entrevista não encontrada' });

    try {
      const atualizada = await prisma.entrevista.update({
        where: { id },
        data: req.body,
      });
      res.json(atualizada);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar entrevista', error });
    }
  },

  
  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const entrevista = await prisma.entrevista.findUnique({ where: { id } });
    if (!entrevista) return res.status(404).json({ message: 'Entrevista não encontrada' });

    try {
      await prisma.entrevista.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: 'Erro ao deletar entrevista', error });
    }
  },
};
