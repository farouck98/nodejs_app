import express from "express";
import { body, validationResult } from "express-validator";
import {
    hashPassword,
    createUser,
    loginUser,
    generateJwt,
} from "../services/users.js";

const router = express.Router();

const validationRules = [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 6 }).withMessage("Password is too short"),
];

//Route pour l'Inscription d'un utilisateur
router.post("/register", validationRules, async (req, res)=> {
    // je dois valider les données reçues dans le body de la requête
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    const { email, password } = req.body;
    try {
        // je dois faire appel au service pour hasher le mot de passe
        const hashedPassword = await hashPassword(password);

        // je dois faire appel au service pour créer un nouvel utilisateur
        await createUser({ email, password: hashedPassword });

        // je dois générer un jwt signé avec RSA
        const token = await generateJwt({ email });

        // enrigister le jwt dans un cookie
        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
        });

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }

});

//Route pour l'authentification
router.post("/login", async (req, res) => {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({error: "Email et mot de passe sont requis" });
    }
    try {
        const token = await loginUser(email, password);

        // enrigister le jwt dans un cookie
        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
        });
        res.status(200).json({ message: "Utilisateur authentifié avec succès" });
    } catch (error) {
        console.error("Erreur d'authentification:", error);
        return res.status(401).json({ error: "Athentification échouée" });
    }
})

//Route pour la déconnexion de l'Utilisateur:
router.post("/logout", (req, res) =>{
    res.clearCookie("auth-token");
    res.status(200).json({ message: "Utilisateur déconnecté avec succès" });
} )

export default router;