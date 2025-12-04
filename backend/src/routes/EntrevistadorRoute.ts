import { Router } from 'express';
import EntrevistadorController from '../controllers/EntrevistadorController';
import validateParams from '../middlewares/validateParams';
import { atualizarEntrevistadorSchema, criarEntrevistadorSchema, idEntrevistadorParamSchema } from '../schemas/entrevistadorSchema';
import validateBody from '../middlewares/validateBody';
import validateQuery from '../middlewares/validateQuery';


/**
 * @swagger
 * tags:
 *   name: Entrevistadores
 *   description: Gerenciamento de entrevistadores
 */
const router = Router();

/**
 * @swagger
 * /entrevistadores:
 *   get:
 *     summary: Lista todos os entrevistadores
 *     tags: [Entrevistadores]
 *     responses:
 *       200:
 *         description: Lista de entrevistadores
 *       400: 
 *         description: Erro ao listar entrevistadores
 */
router.get('/',EntrevistadorController.findAll);

/**
 * @swagger
 * /entrevistadores/{id}:
 *   get:
 *     summary: Busca um entrevistador por ID
 *     tags: [Entrevistadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrevistador encontrado
 */
router.get('/:id',
    validateParams(idEntrevistadorParamSchema),
    EntrevistadorController.findOne);

/**
 * @swagger
 * /entrevistadores:
 *   post:
 *     summary: Cria um novo entrevistador
 *     tags: [Entrevistadores]
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
 *     responses:
 *       201:
 *         description: Entrevistador criado
 *       400:
 *         description: Entrevistador inválido
 */
router.post('/',
    validateBody(criarEntrevistadorSchema),
    EntrevistadorController.create);

/**
 * @swagger
 * /entrevistadores/{id}:
 *   put:
 *     summary: Atualiza um entrevistador
 *     tags: [Entrevistadores]
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
 *     responses:
 *       200:
 *         description: Entrevistador atualizado
 *       400:
 *          description: Erro ao atualizar
 *
 */
router.put('/:id',
    validateParams(idEntrevistadorParamSchema),
    validateBody(atualizarEntrevistadorSchema),
    EntrevistadorController.update);

/**
 * @swagger
 * /entrevistadores/{id}:
 *   delete:
 *     summary: Deleta um entrevistador
 *     tags: [Entrevistadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Entrevistador deletado
 *       400: 
 *         description: Erro ao deletar candidato
 */
router.delete('/:id',
    validateParams(idEntrevistadorParamSchema),
    EntrevistadorController.remove);

export default router;
