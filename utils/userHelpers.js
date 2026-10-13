export const formatUserResponse = (user) => ({
  _id: user._id,
  employeeId: user.employeeId,
  name: user.name,
  email: user.email,
  phoneNumber: user.phoneNumber,
  address: user.address,
  uid: user.uid,
  role: user.role,
  profileImage: user.profileImage,
});
