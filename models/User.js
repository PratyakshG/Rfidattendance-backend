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
    // we do not need the shift as employee login time is not fixed and is completely variable -> might work if the employee are very punctual and then we can add a buffer time
    currentShift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      default: null,
    },
    // monthlySalary: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
