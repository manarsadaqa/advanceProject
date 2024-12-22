const pool = require("./database");

const getParticipantsInGarden = async (projectId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `SELECT user_id FROM advance.garden_invitations WHERE garden_id =?`;
    const [rows, fields] = await connection.execute(sql, [projectId]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const createInvation = async (userId, gardenId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `INSERT INTO advance.garden_invitations (garden_id, user_id, role, status) VALUES (?, ?, 'collaborator', 'pending')`;
    const [rows, fields] = await connection.execute(sql, [gardenId, userId]);
    connection.release();
    return rows;
  } catch (err) {
    throw err;
  }
};

const getInvitationDetails = async (parameters, status = "pending") => {
  try {
    if (!parameters || typeof parameters !== "object") {
      throw new Error("Parameters must be provided as an object.");
    }

    const filteredKeys = Object.keys(parameters).filter(
      (key) => parameters[key]
    );

    let sql = "SELECT * FROM advance.garden_invitations WHERE";
    const placeholders = filteredKeys.map((key) => `${key} = ?`).join(" AND ");
    const values = filteredKeys.map((key) => parameters[key]);

    sql += ` ${placeholders}`;
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(sql, values);

    connection.release();
    return rows;
  } catch (err) {
    throw err;
  }
};

const acceptInvation = async (userId, invationId) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const sql = `DELETE FROM advance.garden_invitations WHERE invitation_id = ? AND user_id = ?`;
    console.log(`Executing SQL: ${sql} with values invitation_id=${invationId}, user_id=${userId}`);
    const [result] = await connection.execute(sql, [invationId, userId]);
    return result;
  } catch (err) {
    console.error(`SQL Error: ${err.message}`);
    throw err;
  } finally {
    if (connection) connection.release(); // تأكد من تحرير الاتصال بعد التنفيذ
  }
};





const rejectInvitation = async (userId, invationId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM advance.garden_invitations WHERE invitation_id = ? AND user_id = ? `;
    const [result] = await connection.execute(sql, [invationId, userId]);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteInvitation = async (invitationId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM advance.garden_invitations WHERE invitation_id = ?`;
    const [result] = await connection.execute(sql, [invitationId]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getParticipantsInGarden,
  createInvation,
  getInvitationDetails,
  acceptInvation,
  rejectInvitation,
  deleteInvitation,
};
