import { Router } from 'express';
import { StudentController } from './student.controller';
import { validate } from '../../core/middlewares/validate.middleware';
import { authMiddleware } from '../../core/middlewares/auth.middleware';
import { createStudentSchema, updateStudentSchema, loginSchema } from './student.schema';

const router = Router();
const studentController = StudentController.getInstance();

router.post('/register', validate(createStudentSchema), studentController.register);
router.post('/login', validate(loginSchema), studentController.login);
router.get('/me', authMiddleware, studentController.getMe);
router.put('/me', authMiddleware, validate(updateStudentSchema), studentController.updateMe);

export default router; 