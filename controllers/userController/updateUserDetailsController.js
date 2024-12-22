const { getUserById } = require(`./../../models/userModle`);
const {
  updateUserInfoService,
} = require(`../../services/userServices/updateUserInfoService`);
const updateUserDetailsController = async (req, res) => {
  const loginUserID = req.userId;
  const userIdToUpdate = req.params.userId;

  let userID;
  if (userIdToUpdate !== undefined && req.userRole == "admin") {
    console.log("You are an admin.");
    userID = userIdToUpdate;
  } else userID = loginUserID;

  try {
    await updateUserInfoService(userID, req.body);
    res.status(200).json({
      success: true,
      message: "User Information Updated Successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: "Failed to Update user information: " + error.message,
    });
  }
};
module.exports = { updateUserDetailsController };
