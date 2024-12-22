const userModel = require(`./../../models/userModle`);
const { userSkills } = require(`./../../models/skillModle`);
const getAllUserServices = async () => {
  try {
    const users = await userModel.getAllUsers();

    const usersIds = users.map((user) => user.id);

    const skillsData = await userSkills(usersIds);

    for (let user of users) {
      const userSkills = skillsData
        .filter((skill) => skill.user_id === user.id)
        .map((skill) => skill.skill_name);
      user.skills = userSkills;
    }

    return users;
  } catch (error) {
    throw error;
  }
};

const getUserByIdService = async (userId) => {
  try {
    const user = await userModel.getUserById(userId);
    if (user == null) {
      return;
    }
    const skillsData = await userSkills([userId]);

    const userSkillsNames = skillsData
      .filter((skill) => skill.user_id === user.id)
      .map((skill) => skill.skill_name);

    user.skills = userSkillsNames;

    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = { getAllUserServices, getUserByIdService };
