import { Router } from 'express';
import EntrevistadorController from '../controllers/EntrevistadorController';

const router = Router();

router.get('/', EntrevistadorController.findAll);
router.get('/:id', EntrevistadorController.findOne);
router.post('/', EntrevistadorController.create);
router.put('/:id', EntrevistadorController.update);
router.delete('/:id', EntrevistadorController.remove);

export default router;
