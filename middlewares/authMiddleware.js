import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicKeyPath = path.resolve(__dirname, "../public.key");
const publicKey = fs.readFileSync(publicKeyPath, "utf-8");

function authenticateToken(req, res, next) {
    const token = req.cookies["auth-token"];

    if (!token) {
        return res.sendStatus(401); // Non authorisé
    }

    jwt.verify(token, publicKey, { algorithms: ["RS256"] },
        (err, user) => {
        if (err) {
            return res.sendStatus(401); // Interdit
        }
        req.user = user;
        next();
        });
}

export default authenticateToken;
