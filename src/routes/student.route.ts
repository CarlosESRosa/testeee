import { Router } from "express";
import { Student } from "../models/Student";

const router = Router();

// cria um estudante
router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (e) {
        res.status(400).json({ error: (e as Error).message });
    }
});

// lista estudantes + simulações
router.get("/", async (_req, res) => {
    const students = await Student.findAll({ include: { all: true } });
    res.json(students);
});

export default router;
