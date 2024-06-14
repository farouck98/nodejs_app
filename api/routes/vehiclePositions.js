import express from "express";
import { addVehiclePosition, getVehiclePositions } from "../services/vehiclePositions.js";
import authenticateToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Route pour ajouter manuellement les données de postion d'un véhicule
router.post("/add-position", authenticateToken, async (req, res) => {
    const { vehicleId, position } = req.body;

    if (!vehicleId || !position || position.lat === undefined || position.lon === undefined) {
        return res.status(400).json({ error: "Tous les champs sont requis"});
    }

    try {
        const newVehiclePostion = await addVehiclePosition({ vehicleId, position});
        return res.status(201).json({ message: "Positions du véhicule ajoutées avec succès", position: newVehiclePostion});
    } catch (error) {
        console.error("Erruer lors de l'ajout des positions du véhicule:", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
// Route pour récupérer les positions des véhicules protégée
// par la middleware d'authentification
router.get("/positions", authenticateToken, async (req, res) => {
    try {
        const positions = await getVehiclePositions();
        return res.status(200).json(positions);
    } catch (error) {
        console.log("Erreur lors de la récupération des positions des véhicules:", error);
        return res.status(500).json({ error: "Erreur interne du serveur"})
    }
});

export default router;