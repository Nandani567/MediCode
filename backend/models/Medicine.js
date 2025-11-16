import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dose: { type: String, required: true },
  time: { type: String, required: true },
  image: { type: String }, 
  prescriptionText: { type: String }, 
  totalQuantity: { type: Number, default: 0 },
  dailyDose: { type: Number, default: 1 },

}, { timestamps: true });

export default mongoose.model("Medicine", medicineSchema);
