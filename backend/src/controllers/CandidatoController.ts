import { Request, Response } from 'express';
import CandidatoService from '../services/CandidatoService';

export default {
  async findAll(req: Request, res: Response) {
    const candidatos = await CandidatoService.findAll();
    res.json(candidatos);
  },

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const candidato = await CandidatoService.findOne(id);
    if (!candidato) return res.status(404).json({ error: 'Candidato não encontrado' });
    res.json(candidato);
  },

  async create(req: Request, res: Response) {
    try {
      const novo = await CandidatoService.create(req.body);
      res.status(201).json(novo);
    } catch (error: any) {
      const msg = error?.message || 'Erro ao criar candidato';
      return res.status(400).json({ error: msg });
    }
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const atualizado = await CandidatoService.update(id, req.body);
    res.json(atualizado);
  },

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await CandidatoService.remove(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error?.message || 'Erro ao deletar candidato' });
    }
  },
};
