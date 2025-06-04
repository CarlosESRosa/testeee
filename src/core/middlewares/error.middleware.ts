import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public details?: any
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
            ...(error.details && { details: error.details })
        });
    }

    if (error instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            details: error.errors,
        });
    }

    console.error('Error:', error);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
}; 