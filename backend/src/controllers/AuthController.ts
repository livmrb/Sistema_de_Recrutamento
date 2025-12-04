import { Request, Response } from 'express';
import prisma from '../config/prisma';

export default {
  async login(req: Request, res: Response) {
    const { email } = req.body;
    const senhaEntrada: string | undefined = req.body.senha ?? req.body.password;

    if (!senhaEntrada) {
      return res.status(400).json({ error: 'Senha obrigatoria.' });
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || usuario.senha !== senhaEntrada) {
      return res.status(401).json({ error: 'Credenciais invalidas.' });
    }

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
