import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  shiftName: { type: String, required: true, unique: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  graceMinutes: { type: Number, default: 15 },
  minimumHours: { type: Number, default: 4 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Shift", shiftSchema);