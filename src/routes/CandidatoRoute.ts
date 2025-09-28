import { Router } from 'express';
import CandidatoController from '../controllers/CandidatoController';

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
 */
router.get('/:id', CandidatoController.findOne);

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
 */
router.post('/', CandidatoController.create);

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
 */
router.put('/:id', CandidatoController.update);

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
 */
router.delete('/:id', CandidatoController.remove);

export default router;
