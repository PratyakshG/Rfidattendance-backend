import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    employeeId: { type: String, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    role: { type: String, default: "Employee" },
    profileImage: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    salary: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
