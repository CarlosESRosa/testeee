import { Router } from 'express';
import studentRoutes from '../modules/student/student.routes';
import simulationRoutes from '../modules/simulation/simulation.routes';

const router = Router();

router.use('/students', studentRoutes);
router.use('/simulations', simulationRoutes);

export default router; 