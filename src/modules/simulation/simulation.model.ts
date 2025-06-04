import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database';
import { ISimulation } from './types';
import { Student } from '../student/student.model';

export class Simulation extends Model implements ISimulation {
    declare id: number;
    declare studentId: number;
    declare totalValue: number;
    declare numberOfInstallments: number;
    declare monthlyInterestRate: number;
    declare monthlyInstallmentValue: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Simulation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Student,
                key: 'id',
            },
        },
        totalValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        numberOfInstallments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        monthlyInterestRate: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        monthlyInstallmentValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'simulations',
        timestamps: true,
    }
);

// Define associations
Simulation.belongsTo(Student, { foreignKey: 'studentId' });
Student.hasMany(Simulation, { foreignKey: 'studentId' }); 