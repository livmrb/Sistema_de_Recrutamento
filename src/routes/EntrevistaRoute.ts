import { Router } from 'express';
import EntrevistaController from '../controllers/EntrevistaController';

const router = Router();

router.get('/', EntrevistaController.findAll);
router.get('/:id', EntrevistaController.findOne);
router.post('/', EntrevistaController.create);
router.put('/:id', EntrevistaController.update);
router.delete('/:id', EntrevistaController.remove);

export default router;
