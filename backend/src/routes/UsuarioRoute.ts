import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import validateParams from '../middlewares/validateParams';
import validateBody from '../middlewares/validateBody';
import validateQuery from '../middlewares/validateQuery';
import {
    criarUsuarioSchema,
    atualizarUsuarioSchema,
    idParamSchema
} from '../schemas/usuarioSchema';

/** 
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários do sistema
 */
const router = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       400: 
 *         description: Erro ao listar usuários
 */
router.get('/', UsuarioController.findAll);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id',
    validateParams(idParamSchema),
    UsuarioController.findOne);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post('/',
    validateBody(criarUsuarioSchema),
    UsuarioController.create);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
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
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       400: 
 *         description: Erro ao atualizar usuário
 */
router.put('/:id',
    validateParams(idParamSchema),
    validateBody(atualizarUsuarioSchema),
    UsuarioController.update);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário deletado
 *       400: 
 *         description: Erro ao deletar usuário
 */
router.delete('/:id',
    validateParams(idParamSchema),
    UsuarioController.remove);

export default router;
