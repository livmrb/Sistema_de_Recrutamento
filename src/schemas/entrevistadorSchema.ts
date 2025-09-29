import { z } from 'zod';

export const criarEntrevistadorSchema = z.object({
    nome: z.string().min(3, {message: "O nome deve ter no mínimo 3 caracteres."}),
    departamento: z.string().min(2,{message: "O departamento deve ter no mínimo 2 caracteres."}),
    cargo: z.string().min(2, {message: "O cargo deve ter no mínimo 2 caracteres"}),
});

export const atualizarEntrevistadorSchema = z.object({
    nome: z.string().min(3, {message: "O nome deve ter no mínimo 3 caracteres"}),
    departamento: z.string().min(2,{message: "O departamento deve ter no mínimo 2 caracteres."}),
    cargo: z.string().min(2, {message: "O cargo deve ter no mínimo 2 caracteres"}),
});

export const idEntrevistadorParamSchema = z.object({
  id: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
    message: 'O ID deve ser um número inteiro positivo.',
  }),
});

// Tipagem para o body do criar entrevistador
export type CriarEntrevistadorBody = z.infer<typeof criarEntrevistadorSchema>;