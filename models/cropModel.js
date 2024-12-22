const pool = require("./database");
const addNewCrop = async (crop) => {
  const columns = Object.keys(crop);
  const values = Object.values(crop);

  const columnNames = columns.join(", ");
  const placeHolders = values.map(() => "?").join(", ");

  const sql = `INSERT INTO crop (${columnNames}) VALUES (${placeHolders})`;
  try {
    const [rows, fields] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAllCropsByUserId = async (userId) => {
  try {
    const sql = `SELECT * FROM crop WHERE user_id = ?`;
    const [rows, fields] = await pool.query(sql, [userId]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getCropById = async (cropId) => {
  try {
    const sql = `SELECT * FROM crop WHERE id = ?`;
    const [rows, fields] = await pool.query(sql, [cropId]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteCropById = async (cropId) => {
  try {
    const sql = `DELETE FROM crop WHERE id = ?`;
    const [result] = await pool.query(sql, [cropId]);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateCropById = async (cropId, updatedFields) => {
  try {
    let sql = "UPDATE crop SET ";
    const queryParams = [];
    const fieldNames = Object.keys(updatedFields);

    fieldNames.forEach((fieldName, index) => {
      sql += `${fieldName} = ?`;
      queryParams.push(updatedFields[fieldName]);
      if (index < fieldNames.length - 1) {
        sql += ", ";
      }
    });

    sql += " WHERE id = ?";
    queryParams.push(cropId);

    const [result] = await pool.query(sql, queryParams);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addNewCrop,
  getAllCropsByUserId,
  getCropById,
  deleteCropById,
  updateCropById,
};