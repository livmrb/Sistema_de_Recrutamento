import { z } from 'zod';

export const criarEntrevistaSchema = z.object({
  data: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Data inválida.' }),
  status: z.string().min(3, { message: 'O status deve ter no mínimo 3 caracteres.' }),
  observacoes: z.string().optional(),
  candidatoId: z.number().int().positive({ message: 'O ID do candidato deve ser um número inteiro positivo.' }),
  entrevistadorId: z.number().int().positive({ message: 'O ID do entrevistador deve ser um número inteiro positivo.' }),
});

export const atualizarEntrevistaSchema = z.object({
  data: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Data inválida.' }).optional(),
  status: z.string().min(3, { message: 'O status deve ter no mínimo 3 caracteres.' }).optional(),
  observacoes: z.string().optional(),
  candidatoId: z.number().int().positive({ message: 'O ID do candidato deve ser um número inteiro positivo.' }).optional(),
  entrevistadorId: z.number().int().positive({ message: 'O ID do entrevistador deve ser um número inteiro positivo.' }).optional(),
});

export const idEntrevistaParamSchema = z.object({
  id: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
    message: 'O ID deve ser um número inteiro positivo.',
  }),
});

// Tipagem para o body da criação de entrevista
export type CriarEntrevistaBody = z.infer<typeof criarEntrevistaSchema>;
