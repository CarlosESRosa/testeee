export interface ISimulation {
    id: number;
    studentId: number;
    totalValue: number;
    numberOfInstallments: number;
    monthlyInterestRate: number;
    monthlyInstallmentValue: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateSimulationDTO {
    totalValue: number;
    numberOfInstallments: number;
    monthlyInterestRate: number;
}

export interface ISimulationResponse {
    id: number;
    studentId: number;
    totalValue: number;
    numberOfInstallments: number;
    monthlyInterestRate: number;
    monthlyInstallmentValue: number;
    createdAt: Date;
    updatedAt: Date;
} 