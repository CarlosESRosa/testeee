import { Request, Response, NextFunction } from 'express';
import { SimulationService } from './simulation.service';
import { AppError } from '../../core/middlewares/error.middleware';

export class SimulationController {
    private static instance: SimulationController;
    private simulationService: SimulationService;

    private constructor() {
        this.simulationService = SimulationService.getInstance();
    }

    public static getInstance(): SimulationController {
        if (!SimulationController.instance) {
            SimulationController.instance = new SimulationController();
        }
        return SimulationController.instance;
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user?.id) {
                throw new AppError(401, 'User not authenticated');
            }
            const simulation = await this.simulationService.create(req.user.id, req.body);
            res.status(201).json(simulation);
        } catch (error) {
            next(error);
        }
    };

    public getMySimulations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user?.id) {
                throw new AppError(401, 'User not authenticated');
            }
            const simulations = await this.simulationService.getByStudentId(req.user.id);
            res.json(simulations);
        } catch (error) {
            next(error);
        }
    };
} 