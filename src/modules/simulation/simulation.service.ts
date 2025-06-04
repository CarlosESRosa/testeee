import { Simulation } from './simulation.model';
import { ICreateSimulationDTO, ISimulationResponse } from './types';
import { AppError } from '../../core/middlewares/error.middleware';
import { calculateMonthlyInstallment } from '../../core/utils/finance';

export class SimulationService {
    private static instance: SimulationService;

    private constructor() { }

    public static getInstance(): SimulationService {
        if (!SimulationService.instance) {
            SimulationService.instance = new SimulationService();
        }
        return SimulationService.instance;
    }

    private mapToResponse(simulation: Simulation): ISimulationResponse {
        return simulation.toJSON();
    }

    async create(studentId: number, data: ICreateSimulationDTO): Promise<ISimulationResponse> {
        const monthlyInstallmentValue = calculateMonthlyInstallment(
            data.totalValue,
            data.numberOfInstallments,
            data.monthlyInterestRate
        );

        const simulation = await Simulation.create({
            ...data,
            studentId,
            monthlyInstallmentValue,
        });

        return this.mapToResponse(simulation);
    }

    async getByStudentId(studentId: number): Promise<ISimulationResponse[]> {
        const simulations = await Simulation.findAll({
            where: { studentId },
            order: [['createdAt', 'DESC']],
        });

        return simulations.map(this.mapToResponse);
    }
} 