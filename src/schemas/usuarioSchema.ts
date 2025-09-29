// src/schemas/usuarioSchema.ts
import { z } from 'zod';

// Schema para criar usuário (POST /usuario)
export const criarUsuarioSchema = z.object({
   nome: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
    email: z.string().email({ message: 'Formato de e-mail inválido.' }),
    senha: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
});

// Schema para atualizar usuário (PUT /usuario/:id)
export const atualizarUsuarioSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
    email: z.string().email({ message: 'Formato de e-mail inválido.' }),
    senha: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    
  params: z.object({
    id: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
      message: 'O ID deve ser um número inteiro positivo.',
    }),
  }),
});

// Schema apenas para validar ID na rota (GET/DELETE /usuario/:id)
export const idParamSchema = z.object({
  id: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
      message: 'O ID deve ser um número inteiro positivo.',
  }),
});

