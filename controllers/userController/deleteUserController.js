const {
  deleteUserService,
} = require(`./../../services/userServices/deleteUserService`);
const deleteUserController = async (req, res) => {
  try {
    console.log("delete");
    const loginUserID = req.userId;
    const userIdToUpdate = req.params.userId;

    let userID;
    if (userIdToUpdate !== undefined && req.userRole == "admin") {
      console.log("You are an admin.");
      userID = userIdToUpdate;
    } else userID = loginUserID;

    await deleteUserService(userID);
    res.status(204).json({});
  } catch (error) {
    res.status(error.status || 500).json({
      error: "Failed to Update user information: ",
      message: error.message,
    });
  }
};
module.exports = { deleteUserController };
