const userModel = require(`./../../models/userModle`);
const bycrpt = require("bcrypt");
const userModle = require(`../../models/userModle`);
const updateUserInfoService = async (userId, updatedUserInfo) => {
  try {
    const password = updatedUserInfo.password;
    const hashPassword = await bycrpt.hash(password, 10);
    updatedUserInfo.password = hashPassword;
    const userFound = await userModle.findUser(
      { username: updatedUserInfo.username, email: updatedUserInfo.email },
      " OR "
    );
    console.log("user found : ", userFound);
    const userExist = userFound.length != 0;
    if (userExist) {
      const error = new Error(`email or username are already exists.`);
      error.status = 409;
      throw error;
    }
    await userModel.updateUserInformations(userId, updatedUserInfo);
  } catch (error) {
    throw error;
  }
};
module.exports = { updateUserInfoService };
