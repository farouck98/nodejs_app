import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const privateKeyPath = path.resolve(__dirname, "../../private.key");

let privateKey;
try {
    privateKey = fs.readFileSync(privateKeyPath, "utf-8");
} catch (error) {
    console.error("Error reading the private key", error);
    process.exit(1);
}
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Error hashing the password");
    }

}

//Fonction pour la création d'un nouvel utilisateur
async function createUser(user) {
    try {
       const newUser = new User(user);
       await newUser.save();
    } catch (error) {
        throw new Error("Error while creating a new user");
    }
}

//Fonction pour authentifier un utilisateur
async function loginUser(email, password){
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Utilisateur pas trouvé");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Mot de passe invalide");
        }
        const token = await generateJwt({ email });
        return token;
    } catch (error) {
        throw new Error("Connexion échouée")
    }
}
async function generateJwt(data) {
    return new Promise((resolve, reject) => {

        jwt.sign(
            data,
            privateKey,
            { algorithm: "RS256", expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    return reject(err);
                }
                resolve(token);
            }
        );
    });
}

export { hashPassword, createUser, loginUser, generateJwt };