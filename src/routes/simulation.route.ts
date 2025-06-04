import { Router } from "express";
import { Simulation } from "../models/Simulation";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const sim = await Simulation.create(req.body);
        res.status(201).json(sim);
    } catch (e) {
        res.status(400).json({ error: (e as Error).message });
    }
});

export default router;
