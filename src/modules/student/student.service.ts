import bcrypt from 'bcrypt';
import { Student } from './student.model';
import { ICreateStudentDTO, IUpdateStudentDTO, IStudentResponse } from './types';
import { AppError } from '../../core/middlewares/error.middleware';
import { generateToken } from '../../core/utils/jwt';

export class StudentService {
    private static instance: StudentService;

    private constructor() { }

    public static getInstance(): StudentService {
        if (!StudentService.instance) {
            StudentService.instance = new StudentService();
        }
        return StudentService.instance;
    }

    private mapToResponse(student: Student): IStudentResponse {
        const { password, ...studentWithoutPassword } = student.toJSON();
        return studentWithoutPassword;
    }

    async create(data: ICreateStudentDTO): Promise<IStudentResponse> {
        const existingStudent = await Student.findOne({ where: { email: data.email } });
        if (existingStudent) {
            throw new AppError(400, 'Email already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const student = await Student.create({
            ...data,
            password: hashedPassword,
        });

        return this.mapToResponse(student);
    }

    async login(email: string, password: string): Promise<{ token: string; student: IStudentResponse }> {
        const student = await Student.findOne({ where: { email } });
        if (!student) {
            throw new AppError(401, 'Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            throw new AppError(401, 'Invalid credentials');
        }

        const token = generateToken({ id: student.id, email: student.email });
        return { token, student: this.mapToResponse(student) };
    }

    async getById(id: number): Promise<IStudentResponse> {
        const student = await Student.findByPk(id);
        if (!student) {
            throw new AppError(404, 'Student not found');
        }

        return this.mapToResponse(student);
    }

    async update(id: number, data: IUpdateStudentDTO): Promise<IStudentResponse> {
        const student = await Student.findByPk(id);
        if (!student) {
            throw new AppError(404, 'Student not found');
        }

        if (data.email) {
            const existingStudent = await Student.findOne({ where: { email: data.email } });
            if (existingStudent && existingStudent.id !== id) {
                throw new AppError(400, 'Email already registered');
            }
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        await student.update(data);
        return this.mapToResponse(student);
    }
} 