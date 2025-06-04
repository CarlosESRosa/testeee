import {
    Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull,
    ForeignKey, BelongsTo, DataType, Default
} from "sequelize-typescript";
import { Student } from "./Student";
import { sequelize } from "../config/database";

@Table
export class Simulation extends Model {
    @PrimaryKey @AutoIncrement @Column
    id!: number;

    @ForeignKey(() => Student) @Column
    id_estudante!: number;

    @BelongsTo(() => Student)
    student?: Student;

    @AllowNull(false) @Column(DataType.DECIMAL(10, 2))
    valor_total!: number;

    @AllowNull(false) @Column
    quantidade_parcelas!: number;

    @AllowNull(false) @Column(DataType.DECIMAL(5, 2))
    juros_ao_mes!: number;

    @AllowNull(false) @Column(DataType.DECIMAL(10, 2))
    valor_parcela_mensal!: number;

    @Default(DataType.NOW) @Column
    data_criacao!: Date;
}

Simulation.init(
    {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_estudante: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: Student,
                key: 'id',
            },
        },
        valor_total: {
            type: DataType.DECIMAL(10, 2),
            allowNull: false,
        },
        quantidade_parcelas: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        juros_ao_mes: {
            type: DataType.DECIMAL(5, 2),
            allowNull: false,
        },
        valor_parcela_mensal: {
            type: DataType.DECIMAL(10, 2),
            allowNull: false,
        },
        data_criacao: {
            type: DataType.DATE,
            defaultValue: DataType.NOW,
        },
    },
    {
        sequelize,
        tableName: 'simulations',
        timestamps: true,
    }
);
