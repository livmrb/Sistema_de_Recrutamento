import { Request, Response } from 'express';
import prisma from '../config/prisma';

export default {
  async login(req: Request, res: Response) {
    const emailRaw = typeof req.body.email === 'string' ? req.body.email : '';
    const email = emailRaw.toLowerCase().trim() || 'admin@admin.com';

    const usuario = await prisma.usuario.upsert({
      where: { email },
      update: { nome: 'Admin', senha: '' },
      create: { nome: 'Admin', email, senha: '' },
    });

    const token = 'fake-token-admin';

    return res.json({
      token,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  },
};
