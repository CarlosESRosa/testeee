import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import { AppError } from './error.middleware';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
        }
    }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError(401, 'No token provided');
        }

        const [, token] = authHeader.split(' ');

        if (!token) {
            throw new AppError(401, 'No token provided');
        }

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET) as {
                id: number;
                email: string;
            };

            req.user = decoded;
            next();
        } catch (error) {
            throw new AppError(401, 'Invalid token');
        }
    } catch (error) {
        next(error);
    }
}; 