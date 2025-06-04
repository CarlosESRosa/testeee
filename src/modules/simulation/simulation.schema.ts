import { z } from 'zod';

export const createSimulationSchema = z.object({
    body: z.object({
        totalValue: z.number().positive('Total value must be positive'),
        numberOfInstallments: z.number().int().min(1, 'Number of installments must be at least 1'),
        monthlyInterestRate: z.number().min(0, 'Monthly interest rate must be non-negative'),
    }),
}); 