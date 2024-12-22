const pool = require("./database");

const addNewPartner = async (partner) => {
  const columns = Object.keys(partner);
  const values = Object.values(partner);

  const columnNames = columns.join(" , ");
  const placeHolders = values.map(() => "?").join(" , ");

  const sql = `INSERT INTO partner (${columnNames}) VALUES (${placeHolders})`;
  try {
    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getPartnerById = async (partnerId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `SELECT * FROM partner WHERE id = ?`;
    const [rows] = await connection.execute(sql, [partnerId]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deletePartnerById = async (partnerId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM partner WHERE id = ?`;
    const [result] = await connection.execute(sql, [partnerId]);
    return result;
  } catch (err) {
    throw err;
  }
};

const updatePartnerById = async (partnerId, updatedFields) => {
  try {
    const connection = await pool.getConnection();
    let sql = "UPDATE partner SET ";
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
    sql += " WHERE id = ?";
    queryParams.push(partnerId);

    // Execute the update query
    const [result] = await connection.execute(sql, queryParams);

    return result;
  } catch (err) {
    throw new Error(`Failed to update Partner: ${err.message}`);
  }
};

const getAllPartners = async () => {
  try {
    const connection = await pool.getConnection();
    const sql = `SELECT * FROM partner`;
    const [rows] = await connection.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addNewPartner,
  getPartnerById,
  deletePartnerById,
  updatePartnerById,
  getAllPartners,
};
