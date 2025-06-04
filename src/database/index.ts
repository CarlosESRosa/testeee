import { Sequelize } from "sequelize-typescript";
import { Student } from "../models/Student";
import { Simulation } from "../models/Simulation";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "apiuser",
    password: "apipass",
    database: "minha_api",
    models: [Student, Simulation],
    logging: false, // mude pra true se quiser ver SQL
});
