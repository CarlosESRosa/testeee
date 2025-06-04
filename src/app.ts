import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
import { errorMiddleware } from './core/middlewares/error.middleware';
import routes from './routes';

const app = express();

// Request logging
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: req.body
    });
    next();
});

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
/* const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);*/

// Routes
app.use('/api', routes);

// Error handling
app.use(errorMiddleware);

export default app; 