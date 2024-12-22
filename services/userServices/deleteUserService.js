const { getUserById, deleteUser } = require(`./../../models/userModle`);
const deleteUserService = async (userId) => {
  try {
    const user = await getUserById(userId);
    console.log(user);
    if (user == null) {
      const error = new Error("User Not Found ! ");
      error.status = 404;
      throw error;
    }
    await deleteUser(userId);
  } catch (error) {
    throw error;
  }
};
module.exports = { deleteUserService };
