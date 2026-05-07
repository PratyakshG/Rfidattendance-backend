import Shift from "../models/Shift.js";
import User from "../models/User.js";

export const createShift = async (req, res) => {
  try {
    const { shiftName, startTime, endTime, graceMinutes = 15, minimumHours = 4 } = req.body;

    if (!shiftName || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "shiftName, startTime and endTime are required"
      });
    }

    const existing = await Shift.findOne({ shiftName, isActive: true });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Shift with this name already exists"
      });
    }

    const shift = await Shift.create({
      shiftName,
      startTime,
      endTime,
      graceMinutes,
      minimumHours
    });

    res.json({ success: true, message: "Shift created successfully", shift });
  } catch (error) {
    console.error("❌ Create Shift Error:", error);
    res.status(500).json({ success: false, message: "Failed to create shift" });
  }
};

export const assignShift = async (req, res) => {
  try {
    const { userId, shiftId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (shiftId) {
      const shift = await Shift.findById(shiftId);
      if (!shift) return res.status(404).json({ success: false, message: "Shift not found" });
    }

    user.currentShift = shiftId || null;
    await user.save();

    res.json({ success: true, message: shiftId ? "Shift assigned successfully" : "Shift unassigned successfully" });
  } catch (error) {
    console.error("❌ Assign Shift Error:", error);
    res.status(500).json({ success: false, message: "Failed to assign shift" });
  }
};

export const getUserShifts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("currentShift");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, currentShift: user.currentShift });
  } catch (error) {
    console.error("❌ Get User Shift Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user shift" });
  }
};

export const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, shifts });
  } catch (error) {
    console.error("❌ Get All Shifts Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch shifts" });
  }
};

export const updateShift = async (req, res) => {
  try {
    const { shiftId } = req.params;
    const { shiftName, startTime, endTime, graceMinutes, minimumHours } = req.body;

    const shift = await Shift.findByIdAndUpdate(
      shiftId,
      { shiftName, startTime, endTime, graceMinutes, minimumHours },
      { new: true }
    );

    if (!shift) return res.status(404).json({ success: false, message: "Shift not found" });

    res.json({ success: true, message: "Shift updated successfully", shift });
  } catch (error) {
    console.error("❌ Update Shift Error:", error);
    res.status(500).json({ success: false, message: "Failed to update shift" });
  }
};

export const deleteShift = async (req, res) => {
  try {
    const { shiftId } = req.params;

    const shift = await Shift.findByIdAndUpdate(shiftId, { isActive: false }, { new: true });
    if (!shift) return res.status(404).json({ success: false, message: "Shift not found" });

    // Unassign shift from all users who have it
    await User.updateMany({ currentShift: shiftId }, { $set: { currentShift: null } });

    res.json({ success: true, message: "Shift deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Shift Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete shift" });
  }
};