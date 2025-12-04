import { Request, Response } from 'express';
import prisma from '../config/prisma';

export default {
  async findAll(req: Request, res: Response) {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  },

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  },

  async create(req: Request, res: Response) {
    const novo = await prisma.usuario.create({ data: req.body });
    res.status(201).json(novo);
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const atualizado = await prisma.usuario.update({
      where: { id },
      data: req.body,
    });
    res.json(atualizado);
  },

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await prisma.usuario.delete({ where: { id } });
    res.status(204).send();
  },
};
