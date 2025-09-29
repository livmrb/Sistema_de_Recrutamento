import { Router } from 'express';
import CandidatoController from '../controllers/CandidatoController';
import validateBody from '../middlewares/validateBody';
import { atualizarCandidatoSchema, criarCandidatoSchema, idCandidatoParamSchema, } from '../schemas/candidatoSchema';
import validateQuery from '../middlewares/validateQuery';
import validateParams from '../middlewares/validateParams';

/**
 * @swagger
 * tags:
 *   name: Candidatos
 *   description: Gerenciamento de candidatos
 */
const router = Router();

/**
 * @swagger
 * /candidatos:
 *   get:
 *     summary: Lista todos os candidatos
 *     tags: [Candidatos]
 *     responses:
 *       200:
 *         description: Lista de candidatos
 *       404: 
 *         description: Erro ao listar candidatos
 */
router.get('/', CandidatoController.findAll);


/**
 * @swagger
 * /candidatos/{id}:
 *   get:
 *     summary: Busca um candidato por ID
 *     tags: [Candidatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Candidato encontrado
 *       404: 
 *         description: Candidato não encontrado
 */
router.get('/:id',
    validateParams(idCandidatoParamSchema),
    CandidatoController.findOne);

/**
 * @swagger
 * /candidatos:
 *   post:
 *     summary: Cria um novo candidato
 *     tags: [Candidatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Candidato criado
 *       400:
 *         description: Candidato inválido
 */
router.post('/',
    validateBody(criarCandidatoSchema),
    CandidatoController.create);

/**
 * @swagger
 * /candidatos/{id}:
 *   put:
 *     summary: Atualiza um candidato
 *     tags: [Candidatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Candidato atualizado
 *       400:
 *          description: Erro ao atualizar
 *
 */
router.put('/:id',
    validateBody(atualizarCandidatoSchema),
    validateParams(idCandidatoParamSchema),
    CandidatoController.update);

/**
 * @swagger
 * /candidatos/{id}:
 *   delete:
 *     summary: Deleta um candidato
 *     tags: [Candidatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Candidato deletado
 *       400: 
 *         description: Erro ao deletar candidato
 */
router.delete('/:id',
    validateParams(idCandidatoParamSchema),
    CandidatoController.remove);

export default router;
