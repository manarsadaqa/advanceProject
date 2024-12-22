const pool = require("./database");
const addParticipantsToGarden = async (membership) => {
  const columns = Object.keys(membership);
  const values = Object.values(membership);

  const columnNames = columns.join(" , ");
  const placeHolders = values.map(() => "?").join(" , ");

  const sql = `INSERT INTO participants 
                    (${columnNames}) 
                    VALUES (${placeHolders})`;
  try {
    const [rows, fields] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = { addParticipantsToGarden };
