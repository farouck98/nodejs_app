import VehiclePosition from "../../models/vehiclePosition.js";
import VehicleSimulator from "../../vehicleSimulator.js";
import { io } from "../../server.js";


//Fonction pour ajouter les données de position d'un véhicule
async function addVehiclePosition(vehiclePosition) {
    try {
        const newVehiclePosition = new VehiclePosition(vehiclePosition);
        await newVehiclePosition.save();
    } catch (error) {
        throw new Error("Erreur lors de l'ajout des postions d'un véhicule");
    }
}

//Fonction pour la récupération des positions des véhicules
async function getVehiclePositions() {
    try {
        return await VehiclePosition.find({});
    } catch (error) {
        throw new Error("Erreur lors de la récupération des positions des véhicules");
    }

}

export { addVehiclePosition, getVehiclePositions };