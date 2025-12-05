import { z } from 'zod'

export const criarCandidatoSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter no minimo 3 caracteres" }),
  email: z.string().email({ message: "Email invalido" }),
  cargo: z.enum(['Tecnologia', 'RH', 'Design', 'Marketing', 'Vendas', 'Financas'], { message: "Cargo invalido" }),
  telefone: z.string().optional(),
  curriculoURL: z.string().optional(),
})

export const atualizarCandidatoSchema = z.object({
  nome: z.string().min(2, { message: "O nome deve ter no minimo 2 caracteres" }).optional(),
  email: z.string().email({ message: "Email invalido" }).optional(),
  cargo: z.enum(['Tecnologia', 'RH', 'Design', 'Marketing', 'Vendas', 'Financas'], { message: "Cargo invalido" }).optional(),
  telefone: z.string().optional(),
  curriculoURL: z.string().optional(),
})

export const idCandidatoParamSchema = z.object({
  id: z.string().refine(
    val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0,
    { message: "O ID deve ser um numero inteiro positivo" }
  ),
})
