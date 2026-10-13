import mongoose from "mongoose";
import { formatTimeForDisplay } from "./istTime.js";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export const getPagination = (query) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(parseInt(query.limit, 10) || DEFAULT_LIMIT, 1),
    MAX_LIMIT,
  );
  return { page, limit, skip: (page - 1) * limit };
};

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const formatAttendanceRecord = (record) => ({
  ...record,
  checkIn: formatTimeForDisplay(record.checkIn),
  checkOut: formatTimeForDisplay(record.checkOut),
});

export const getMonthRange = (month) => {
  const year = parseInt(month.split("-")[0], 10);
  const monthNum = parseInt(month.split("-")[1], 10);
  const daysInMonth = new Date(year, monthNum, 0).getDate();
  return {
    startDate: `${month}-01`,
    endDate: `${month}-${daysInMonth.toString().padStart(2, "0")}`,
  };
};

export const toMinutes = (timeStr) => {
  if (!timeStr) return 0;
  if (timeStr.includes("AM") || timeStr.includes("PM")) {
    const [time, period] = timeStr.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  }
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};
