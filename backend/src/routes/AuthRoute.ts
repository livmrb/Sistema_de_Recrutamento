import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import validateBody from '../middlewares/validateBody';
import { loginSchema } from '../schemas/usuarioSchema';

const router = Router();

router.post('/login', validateBody(loginSchema), AuthController.login);

export default router;
