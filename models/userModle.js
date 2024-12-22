require("dotenv").config();
const pool = require("./database");

const findUser = async (parameters, logicalOperator = "AND") => {
  try {
    if (typeof parameters !== "object" || parameters === null) {
      throw new Error("Parameters must be an object !!");
    }

    const keys = Object.keys(parameters);
    const placeHolders = keys.map((key) => `${key} = ?`).join(logicalOperator);
    const values = keys.map((key) => parameters[key]);

    const connection = await pool.getConnection();
    const sql = ` SELECT * FROM users WHERE ${placeHolders} `;
    const [rows, fields] = await connection.execute(
      sql,
      Object.values(parameters)
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

const addUser = async (user) => {
  const columns = Object.keys(user);
  const values = Object.values(user);

  const columnNames = columns.join(" , ");
  const placeHolders = values.map(() => "?").join(" , ");

  const sql = ` INSERT INTO users 
                  (${columnNames}) 
                  VALUES (${placeHolders})`;

  try {
    const [rows, fields] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAllUser = async (user) => {
  try {
    const connection = await pool.getConnection();
    const sql = ` SELECT first_name , last_name , email  FROM users  `;
    const [rows, fields] = await connection.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

//serach
const getAllUsers = async () => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT id, username, first_name, last_name, email FROM users WHERE role != 'admin'"
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT id, username, first_name, last_name, email FROM users WHERE id = ?",
      [userId]
    );
    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

const getUsersInCity = async (city) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT u.id, u.username, u.first_name, u.last_name FROM users u JOIN users_location ur ON u.id = ur.user_id JOIN cities c ON ur.city_id = c.id WHERE LOWER(c.name) = ?",
      [city.toLowerCase()]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUsersInCountry = async (country) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT u.id, u.username, u.first_name, u.last_name FROM users u JOIN users_location ur ON u.id = ur.user_id JOIN countries c ON ur.country_id = c.id WHERE LOWER(c.name) = ?",
      [country.toLowerCase()]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUsersInCountryAndCity = async (country, city) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT u.id, u.username, u.first_name, u.last_name, c.name AS city FROM users_location ul JOIN users u ON u.id = ul.user_id JOIN cities c ON ul.city_id = c.id JOIN countries co ON ul.country_id = co.id WHERE LOWER(co.name) = ? AND LOWER(c.name) = ?",
      [country.toLowerCase(), city.toLowerCase()]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUsersInCountryCityAndIds = async (country, city, userIDs) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT u.username, u.first_name, u.last_name, u.email, c.name AS country, ci.name AS city FROM users u JOIN users_location ul ON u.id = ul.user_id JOIN cities ci ON ul.city_id = ci.id JOIN countries c ON ul.country_id = c.id WHERE LOWER(c.name) = ? AND LOWER(ci.name) = ? AND u.id IN (?)",
      [country.toLowerCase(), city.toLowerCase(), userIDs]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserRole = async (userId) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );
    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

const updateUserInformations = async (userId, userInfo) => {
  try {
    const connection = await pool.getConnection();
    let sql = "UPDATE users SET ";
    const queryParams = [];
    const fieldNames = Object.keys(userInfo);

    fieldNames.forEach((fieldName, index) => {
      sql += `${fieldName} = ?`;
      queryParams.push(userInfo[fieldName]);
      if (index < fieldNames.length - 1) {
        sql += ", ";
      }
    });

    sql += " WHERE id = ? ";
    queryParams.push(userId);
    console.log(sql, queryParams);
    const [result] = await connection.execute(sql, queryParams);

    return result;
  } catch (err) {
    throw new Error(`Failed to update user information: ${err.message}`);
  }
};

const deleteUser = async (userId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM users WHERE id = ?`;
    const [result] = await connection.execute(sql, [userId]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findUser,
  addUser,
  getUserRole,
  getAllUsers,
  getUserById,
  getUsersInCity,
  getUsersInCountry,
  getUsersInCountryAndCity,
  getUsersInCountryCityAndIds,
  updateUserInformations,
  deleteUser,
};
