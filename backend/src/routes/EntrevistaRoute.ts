import { Router } from 'express';
import EntrevistaController from '../controllers/EntrevistaController';
import validateParams from '../middlewares/validateParams';
import { atualizarEntrevistaSchema, criarEntrevistaSchema, idEntrevistaParamSchema } from '../schemas/entrevistaSchema';
import validateBody from '../middlewares/validateBody';

/**
 * @swagger
 * tags:
 *   name: Entrevistas
 *   description: Gerenciamento das entrevistas
 */
const router = Router();

/**
 * @swagger
 * /entrevistas:
 *   get:
 *     summary: Lista todas as entrevistas
 *     tags: [Entrevistas]
 *     responses:
 *       200:
 *         description: Lista de entrevistas
 */
router.get('/', EntrevistaController.findAll);

/**
 * @swagger
 * /entrevistas/{id}:
 *   get:
 *     summary: Busca uma entrevista por ID
 *     tags: [Entrevistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrevista encontrada
 */
router.get('/:id',
    validateParams(idEntrevistaParamSchema),
    EntrevistaController.findOne);

/**
 * @swagger
 * /entrevistas:
 *   post:
 *     summary: Cria uma nova entrevista
 *     tags: [Entrevistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *               candidatoId:
 *                 type: integer
 *               entrevistadorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Entrevista criada
 */
router.post('/',
    validateBody(criarEntrevistaSchema),
    EntrevistaController.create);

/**
 * @swagger
 * /entrevistas/{id}:
 *   put:
 *     summary: Atualiza uma entrevista
 *     tags: [Entrevistas]
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
 *               data:
 *                 type: string
 *                 format: date-time
 *               candidatoId:
 *                 type: integer
 *               entrevistadorId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Entrevista atualizada
 */
router.put('/:id',
    validateParams(idEntrevistaParamSchema),
    validateBody(atualizarEntrevistaSchema),
    EntrevistaController.update);


/**
 * @swagger
 * /entrevistas/{id}:
 *   delete:
 *     summary: Deleta uma entrevista
 *     tags: [Entrevistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Entrevista deletada
 */
router.delete('/:id',
    validateParams(idEntrevistaParamSchema),
    EntrevistaController.remove);

export default router;
