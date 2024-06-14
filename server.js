import { Server } from "socket.io";
import express from "express";
import cookieParser from "cookie-parser";
import Database from "./database/index.js";
import userRouter from "./api/routes/users.js";
import vehiclePositionRouter from "./api/routes/vehiclePositions.js";
import * as http from "http";
import VehicleSimulator from "./vehicleSimulator.js";
import {addVehiclePosition} from "./api/services/vehiclePositions.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

app.use(express.json());
app.use(cookieParser());

// Route pour gérer les utilisateurs
app.use("/api/users", userRouter)

// Route pour gérer les données de position des véhicules
app.use("/api/vehicles", vehiclePositionRouter);

Database.connect()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.log("Error connecting to the database", error);
    });

// Démarrage du serveur
server.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});

io.on("connection", (socket) => {
    console.log("Un utilisateur s'est connecté");

    socket.on("message", (msg) => {
        console.log("Message reçu : " + msg);
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("utilisateur déconnecté");
    });
})

const vehicleSimulator = new VehicleSimulator();
//
vehicleSimulator.on("position", async (data) => {
    try {
        await addVehiclePosition({
            vehicleId: data.vehicleId,
            position: data.position,
            timestamp: data.timestamp
        });
        // Emettre la position via Socket
        io.emit("vehiclePosition", data)
    } catch (error) {
        console.error("Erreur lors de l'ajout des postions d'un véhicule", error);
    }
});

//Emettre l'alerte avec Socket.io
vehicleSimulator.on("alert", (data) => {
    io.emit("vehicleAlert", data)
})

vehicleSimulator.start();

export { io };


