import { Request, Response, NextFunction } from 'express';
import { StudentService } from './student.service';
import { AppError } from '../../core/middlewares/error.middleware';

export class StudentController {
    private static instance: StudentController;
    private studentService: StudentService;

    private constructor() {
        this.studentService = StudentService.getInstance();
    }

    public static getInstance(): StudentController {
        if (!StudentController.instance) {
            StudentController.instance = new StudentController();
        }
        return StudentController.instance;
    }

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const student = await this.studentService.create(req.body);
            res.status(201).json(student);
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const result = await this.studentService.login(email, password);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    public getMe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user?.id) {
                throw new AppError(401, 'User not authenticated');
            }
            const student = await this.studentService.getById(req.user.id);
            res.json(student);
        } catch (error) {
            next(error);
        }
    };

    public updateMe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user?.id) {
                throw new AppError(401, 'User not authenticated');
            }
            const student = await this.studentService.update(req.user.id, req.body);
            res.json(student);
        } catch (error) {
            next(error);
        }
    };
} 