export const formatPresentEmployee = (a) => ({
  name: a.user?.name || "Unknown",
  uid: a.user?.uid || "Unknown",
  checkIn: a.checkIn,
  status: a.status,
});

export const formatAbsentEmployee = (a) => ({
  name: a.user?.name || "Unknown",
  uid: a.user?.uid || "Unknown",
});

export const formatOnLeaveEmployee = (l) => ({
  name: l.user?.name || "Unknown",
  uid: l.user?.uid || "Unknown",
  reason: l.reason,
  startDate: l.startDate,
  endDate: l.endDate,
});
