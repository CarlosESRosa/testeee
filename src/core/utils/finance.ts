export const calculateMonthlyInstallment = (
    totalValue: number,
    numberOfInstallments: number,
    monthlyInterestRate: number
): number => {
    // Convert percentage to decimal if needed
    const interestRate = monthlyInterestRate / 100;

    // Price formula: PMT = PV * (i / (1 - (1 + i)^-n))
    const numerator = interestRate;
    const denominator = 1 - Math.pow(1 + interestRate, -numberOfInstallments);
    const monthlyInstallment = totalValue * (numerator / denominator);

    // Round to 2 decimal places
    return Math.round(monthlyInstallment * 100) / 100;
}; 