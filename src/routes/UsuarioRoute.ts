import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = Router();

router.get('/', UsuarioController.findAll);
router.get('/:id', UsuarioController.findOne);
router.post('/', UsuarioController.create);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.remove);

export default router;
