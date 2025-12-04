import { z } from 'zod';

export const criarUsuarioSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter no minimo 3 caracteres.' }),
  email: z.string().email({ message: 'Formato de e-mail invalido.' }),
  senha: z.string().min(6, { message: 'A senha deve ter no minimo 6 caracteres.' }),
});

export const atualizarUsuarioSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter no minimo 3 caracteres.' }).optional(),
  email: z.string().email({ message: 'Formato de e-mail invalido.' }).optional(),
  senha: z.string().min(6, { message: 'A senha deve ter no minimo 6 caracteres.' }).optional(),
});

export const idParamSchema = z.object({
  id: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
    message: 'O ID deve ser um numero inteiro positivo.',
  }),
});

export const loginSchema = z
  .object({
    email: z.string().email({ message: 'Formato de e-mail invalido.' }),
    senha: z.string().min(4, { message: 'A senha deve ter pelo menos 4 caracteres.' }).optional(),
    password: z.string().min(4, { message: 'A senha deve ter pelo menos 4 caracteres.' }).optional(),
  })
  .refine((data) => data.senha || data.password, {
    message: 'A senha e obrigatoria.',
    path: ['senha'],
  });
