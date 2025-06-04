import { Router } from 'express';
import { SimulationController } from './simulation.controller';
import { validate } from '../../core/middlewares/validate.middleware';
import { authMiddleware } from '../../core/middlewares/auth.middleware';
import { createSimulationSchema } from './simulation.schema';

const router = Router();
const simulationController = SimulationController.getInstance();

router.post('/', authMiddleware, validate(createSimulationSchema), simulationController.create);
router.get('/', authMiddleware, simulationController.getMySimulations);

export default router; 