require("dotenv").config();
const pool = require("./database");

const getAvailableCountry = async () => {
  try {
    const conncetion = await pool.getConnection();
    const sql = ` SELECT name FROM countries`;
    const [rows, fields] = await conncetion.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAvailableCities = async () => {
  try {
    const conncetion = await pool.getConnection();
    const sql = ` SELECT name FROM cities`;
    const [rows, fields] = await conncetion.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAvailableCountryIds = async () => {
  try {
    const conncetion = await pool.getConnection();
    const sql = ` SELECT id FROM countries`;
    const [rows, fields] = await conncetion.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAvailableCitiesIds = async () => {
  try {
    const conncetion = await pool.getConnection();
    const sql = ` SELECT id FROM cities`;
    const [rows, fields] = await conncetion.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getCountryId = async (countryName) => {
  try {
    const conncetion = await pool.getConnection();
    const sql = ` SELECT id FROM countries`;
    const [rows, fields] = await conncetion.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getCityId = async (countryName) => {
  try {
    const conncetion = await pool.getConnection();
    const sql = ` SELECT id FROM cities`;
    const [rows, fields] = await conncetion.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const insertUserLocation = async (userId, countryId, cityId) => {
  try {
    const conncetion = await pool.getConnection();
    const sql = `INSERT INTO users_location (user_id , country_id , city_id ) VALUES ( ? , ? , ?)`;
    await conncetion.execute(sql, [userId, countryId, cityId]);
    await conncetion.release();
  } catch (err) {
    throw err;
  }
};

const getUsersLocation = async (userIds) => {
  try {
    const conncetion = await pool.getConnection();
    const placeholders = userIds.map(() => "?").join(",");
    const sql = `
      SELECT ul.user_id, ul.country_id, ul.city_id, c.name AS country_name, ci.name AS city_name
      FROM users_location ul
      JOIN countries c ON ul.country_id = c.id
      JOIN cities ci ON ul.city_id = ci.id
      WHERE ul.user_id IN (${placeholders})
    `;
    const [rows, fields] = await conncetion.execute(sql, userIds);
    return rows;
  } catch (err) {
    throw err;
  }
};

const addNewCity = async (cityName) => {
  try {
    const conncetion = await pool.getConnection();
    const sql = `INSERT INTO cities (name) VALUES ( ?)`;
    await conncetion.execute(sql, [cityName]);
  } catch (err) {
    throw err;
  }
};

const addNewCountry = async (cityName) => {
  try {
    const conncetion = await pool.getConnection();
    const sql = `INSERT INTO countries (name) VALUES ( ?)`;
    await conncetion.execute(sql, [cityName]);
  } catch (err) {
    throw err;
  }
};

const updateUserLocation = async (userId, cityID, countryID) => {
  try {
    const conncetion = await pool.getConnection();
    const sql = `UPDATE users_location SET country_id = ? , city_id = ?  WHERE user_id = ?`;
    await conncetion.execute(sql, [countryID, cityID, userId]);
  } catch (err) {
    throw err;
  }
};
module.exports = {
  getAvailableCountry,
  getAvailableCities,
  getCountryId,
  getCityId,
  insertUserLocation,
  getUsersLocation,
  addNewCity,
  addNewCountry,
  updateUserLocation,
  getAvailableCountryIds,
  getAvailableCitiesIds,
};
