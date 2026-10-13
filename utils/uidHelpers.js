export const formatUID = (uid) => ({
  _id: uid._id,
  uid: uid.uid,
  status: uid.status,
  employeeName: uid.assignedTo ? uid.assignedTo.name : null,
  employeeId: uid.assignedTo ? uid.assignedTo.employeeId : null,
  addedBy: uid.addedBy,
  createdAt: uid.createdAt,
  updatedAt: uid.updatedAt,
});
