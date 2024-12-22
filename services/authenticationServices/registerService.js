const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModle = require(`../../models/userModle`);
const { getSkillsId, insertUserSkils } = require("../../models/skillModle");
const {
  getCountryId,
  getCityId,
  insertUserLocation,
} = require("../../models/locationModle");
require("dotenv").config();

const register = async (userData) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      skills,
      role,
      location,
    } = userData; 

    const userFound = await userModle.findUser({ username, email }, " OR ");
    console.log("user found : ", userFound);
    const userExist = userFound.length != 0;
    if (userExist) {
      const error = new Error(`User already exists.`);
      error.status = 409;
      throw error;
    }

    const hashPassword = await bycrpt.hash(password, 10);

    const newUserDetails = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashPassword,
      role:role
    };

    const { insertId } = await userModle.addUser(newUserDetails);

    const userId = insertId;
    //to generate token :  openssl rand -base64 32

    const skillsID = [];
    for (skillName of skills) {
      const skillNameID = await getSkillsId(skillName);
      skillsID.push(...skillNameID.map((skill) => parseInt(skill.id)));
    }
    console.log("skill ids ", skillsID);
    await insertUserSkils(userId, skillsID);

    const country = await getCountryId(location.country);
    const countryId = country[0].id;

    const city = await getCityId(location.city);
    const cityId = city[0].id;

    console.log(userId, countryId, cityId);

    await insertUserLocation(userId, countryId, cityId);

    return {
      userId,
      username,
      first_name,
      last_name,
      email,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { register };
