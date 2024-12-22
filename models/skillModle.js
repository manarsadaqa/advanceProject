require("dotenv").config();
const pool = require("./database");

const getAvailableSkills = async (skill) => {
  try {
    const conncetion = await pool.getConnection();
    const sql = ` SELECT name FROM skills`;
    const [rows, fields] = await conncetion.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getSkillsId = async (skillName) => {
  try {
    const conncetion = await pool.getConnection();
    const sql = ` SELECT id FROM skills WHERE name =?`;
    const [rows, fields] = await conncetion.execute(sql, [skillName]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const insertUserSkils = async (userId, skillsID) => {
  try {
    const conncetion = await pool.getConnection();
    for (skillId of skillsID) {
      const sql = `INSERT INTO users_skills (user_id , skill_id ) VALUES ( ? , ? )`;
      await conncetion.execute(sql, [userId, skillId]);
    }
  } catch (err) {
    throw err;
  }
};

const userSkills = async (userIds) => {
  try {
    const conncetion = await pool.getConnection();
    // Generate the placeholders for the user IDs
    const placeholders = userIds.map(() => "?").join(",");
    const sql = `
    SELECT us.user_id, s.name AS skill_name
    FROM advance.users_skills AS us
    JOIN advance.skills AS s ON us.skill_id = s.id
    WHERE us.user_id IN (${placeholders})
    GROUP BY us.user_id, s.name;
    `;
    const [rows, fields] = await conncetion.execute(sql, userIds);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAvailableSkills,
  getSkillsId,
  insertUserSkils,
  userSkills,
};
