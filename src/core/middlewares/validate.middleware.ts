import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from './error.middleware';

export const validate = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('Validating request:', {
            body: req.body,
            query: req.query,
            params: req.params
        });

        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                console.log('Validation errors:', error.errors);
                next(new AppError(400, 'Validation error', error.errors));
            } else {
                next(error);
            }
        }
    };
}; 