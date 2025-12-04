import { z } from 'zod'

export const criarCandidatoSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().min(8, { message: "Telefone inválido" }),
  curriculoURL: z.string().url({ message: "URL do currículo inválida" }),
})

export const atualizarCandidatoSchema = z.object({
  nome: z.string().min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().min(8, { message: "Telefone inválido" }),
  curriculoURL: z.string().url({ message: "URL do currículo inválida" }),
})

export const idCandidatoParamSchema = z.object({
  id: z.string().refine(
    val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0,
    { message: "O ID deve ser um número inteiro positivo" }
  ),
})
