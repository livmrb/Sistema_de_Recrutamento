import { Router } from 'express';
import CandidatoController from '../controllers/CandidatoController';

const router = Router();

router.get('/', CandidatoController.findAll);
router.get('/:id', CandidatoController.findOne);
router.post('/', CandidatoController.create);
router.put('/:id', CandidatoController.update);
router.delete('/:id', CandidatoController.remove);

export default router;
