import { model, Schema} from "mongoose";

const vehiclePositionSchema = new Schema({
    vehicleId: { type: String, required: true},
    position: {
        lat: {type: Number, required: true},
        lon: {type: Number, required: true}
    },
    timestamp: { type: Date, default: Date.now()}
});


const VehiclePosition = model('VehiclePosition', vehiclePositionSchema);
export default VehiclePosition;