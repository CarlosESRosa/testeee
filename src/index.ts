import express from "express";
import { sequelize } from "./database";
import studentRouter from "./routes/student.route";
import simulationRouter from "./routes/simulation.route";

const app = express();
const PORT = 3000;

// Middlewares globais
app.use(express.json());

// Rotas
app.use("/students", studentRouter);
app.use("/simulations", simulationRouter);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // cria tabelas se não existirem
        console.log("🗄️  Banco conectado e sincronizado");
    } catch (err) {
        console.error("Erro ao conectar no banco", err);
        process.exit(1);
    }
})();

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
