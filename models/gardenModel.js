const pool = require("./database");

const addNewGarden = async (garden) => {
  console.log(garden);
  const columns = Object.keys(garden);
  const values = Object.values(garden);

  const columnNames = columns.join(" , ");
  const placeHolders = values.map(() => "?").join(" , ");

  const sql = ` INSERT INTO garden 
                    (${columnNames}) 
                    VALUES (${placeHolders})`;
  try {
    const [rows, fields] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAvailableGardensName = async (GardenName) => {
  try {
    const connection = await pool.getConnection();
    const sql = ` SELECT garden_name FROM garden`;
    const [rows, fields] = await connection.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAllAvailableGardensId = async (GardenId) => {
  try {
    const connection = await pool.getConnection();
    const sql = ` SELECT * FROM garden WHERE id = ? `;
    const [rows, fields] = await connection.execute(sql, [
      GardenId.toString(),
    ]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAllAvailableUserGarden = async (userId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `SELECT * FROM garden WHERE creatorUserID = ?`;
    const [rows, fields] = await connection.execute(sql, [userId]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getGardenByGardenId = async (userId, GardenId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `SELECT * FROM garden WHERE creatorUserID = ? AND id = ?`;
    const [rows, fields] = await connection.execute(sql, [userId, GardenId]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteGardenByGardenId = async (userId, GardenId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM garden WHERE creatorUserID = ? AND id = ?`;
    const [result] = await connection.execute(sql, [userId, GardenId]);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateGardenByGardenId = async (userId, GardenId, updatedFields) => {
  try {
    const connection = await pool.getConnection();
    let sql = "UPDATE garden SET ";
    const queryParams = [];
    const fieldNames = Object.keys(updatedFields);

    // Construct SET clause for SQL query dynamically based on provided fields
    fieldNames.forEach((fieldName, index) => {
      sql += `${fieldName} = ?`;
      queryParams.push(updatedFields[fieldName]);
      if (index < fieldNames.length - 1) {
        sql += ", ";
      }
    });

    // Add WHERE clause to specify the project to update
    sql += " WHERE id = ? AND creatorUserID = ? ";
    queryParams.push(GardenId);
    queryParams.push(userId);

    // Execute the update query
    const [result] = await connection.execute(sql, queryParams);

    return result;
  } catch (err) {
    throw new Error(`Failed to update Garden: ${err.message}`);
  }
};

const getGardenCreator = async (GardenId) => {
  try {
    const connection = await pool.getConnection();
    const sql = ` SELECT creatorUserID FROM garden WHERE id = ?`;
    const [rows, fields] = await connection.execute(sql, [GardenId]);
    return rows;
  } catch (err) {
    throw err;
  }
};
//diaa
const publishGarden = async (GardenId, userID) => {
  try {
    const connection = await pool.getConnection();
    const sql =
      "UPDATE garden SET available_plots ='published' WHERE id = ? AND creatorUserID = ?";
    // Execute the update query
    const [result] = await connection.execute(sql, [GardenId, userID]);

    return result;
  } catch (err) {
    throw new Error(`Failed to update Garden: ${err.message}`);
  }
};
const getAllPublishedGarden = async (filterOptions) => {
  try {
    const connection = await pool.getConnection();
    let sql = `SELECT * FROM garden WHERE available_plots = 'published'`;

    if (Object.keys(filterOptions).length !== 0) {
      const filters = Object.keys(filterOptions).map((key) => {
        if (key === "material_name") {
          return `JSON_CONTAINS(project_materials, '{"name": "${filterOptions[key]}"}')`;
          // Corrected JSON formatting by adding a closing curly brace and a comma before closing the JSON object
        } else {
          return `${key} = '${filterOptions[key]}'`;
        }
      });
      sql += ` AND ${filters.join(" AND ")}`;
    }
    const [rows, fields] = await connection.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getGardenStatus = async (GardenId, userId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `SELECT available_plots FROM garden WHERE creatorUserID = ? AND id = ?`;
    const [rows, fields] = await connection.execute(sql, [userId, GardenId]);
    return rows;
  } catch (err) {
    throw err;
  }
};
const increaseGardenParticipants = async (GardenId) => {
  try {
    const connection = await pool.getConnection();
    const sql =
      "UPDATE garden SET participants = participants + 1 WHERE id = ?";
    // Execute the update query
    const [result] = await connection.execute(sql, [GardenId]);

    return result;
  } catch (err) {
    throw new Error(`Failed to update Garden: ${err.message}`);
  }
};
module.exports = {
  addNewGarden,
  getAvailableGardensName,
  getAllAvailableUserGarden,
  getGardenByGardenId,
  deleteGardenByGardenId,
  getAllAvailableGardensId,
  updateGardenByGardenId,
  getGardenCreator,
  publishGarden,
  getAllPublishedGarden,
  increaseGardenParticipants,
  getGardenStatus,
};
