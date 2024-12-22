const pool = require("./database");

const addNewVolunteer = async (volunteer) => {
  console.log(volunteer);
  const columns = Object.keys(volunteer);
  const values = Object.values(volunteer);

  const columnNames = columns.join(", ");
  const placeHolders = values.map(() => "?").join(", ");

  const sql = `INSERT INTO volunteer (${columnNames}) VALUES (${placeHolders})`;
  try {
    const [rows, fields] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getVolunteerById = async (volunteerId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `SELECT * FROM volunteer WHERE id = ?`;
    const [rows, fields] = await connection.execute(sql, [volunteerId]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAllVolunteers = async () => {
  try {
    const connection = await pool.getConnection();
    const sql = `SELECT * FROM volunteer`;
    const [rows, fields] = await connection.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const updateVolunteerById = async (volunteerId, updatedFields) => {
  try {
    const connection = await pool.getConnection();
    let sql = "UPDATE volunteer SET ";
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

    // Add WHERE clause to specify the volunteer to update
    sql += " WHERE id = ?";
    queryParams.push(volunteerId);

    // Execute the update query
    const [result] = await connection.execute(sql, queryParams);

    return result;
  } catch (err) {
    throw new Error(`Failed to update Volunteer: ${err.message}`);
  }
};

const deleteVolunteerById = async (volunteerId) => {
  try {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM volunteer WHERE id = ?`;
    const [result] = await connection.execute(sql, [volunteerId]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addNewVolunteer,
  getVolunteerById,
  getAllVolunteers,
  updateVolunteerById,
  deleteVolunteerById,
};


// const pool = require("./database");

// const addNewVolunteer = async (volunteer) => {
//   console.log(volunteer);
//   const columns = Object.keys(volunteer);
//   const values = Object.values(volunteer);

//   const columnNames = columns.join(" , ");
//   const placeHolders = values.map(() => "?").join(" , ");

//   const sql = ` INSERT INTO volunteer 
//                     (${columnNames}) 
//                     VALUES (${placeHolders})`;
//   try {
//     const [rows, fields] = await pool.query(sql, values);
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// };

// const getVolunteerById = async (volunteerId) => {
//   try {
//     const connection = await pool.getConnection();
//     const sql = `SELECT * FROM volunteer WHERE id = ?`;
//     const [rows, fields] = await connection.execute(sql, [volunteerId]);
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// };

// const getAllVolunteers = async () => {
//   try {
//     const connection = await pool.getConnection();
//     const sql = `SELECT * FROM volunteer`;
//     const [rows, fields] = await connection.execute(sql);
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// };

// const updateVolunteerById = async (volunteerId, updatedFields) => {
//   try {
//     const connection = await pool.getConnection();
//     let sql = "UPDATE volunteer SET ";
//     const queryParams = [];
//     const fieldNames = Object.keys(updatedFields);

//     // Construct SET clause for SQL query dynamically based on provided fields
//     fieldNames.forEach((fieldName, index) => {
//       sql += `${fieldName} = ?`;
//       queryParams.push(updatedFields[fieldName]);
//       if (index < fieldNames.length - 1) {
//         sql += ", ";
//       }
//     });

//     // Add WHERE clause to specify the volunteer to update
//     sql += " WHERE id = ?";
//     queryParams.push(volunteerId);

//     // Execute the update query
//     const [result] = await connection.execute(sql, queryParams);

//     return result;
//   } catch (err) {
//     throw new Error(`Failed to update Volunteer: ${err.message}`);
//   }
// };

// const deleteVolunteerById = async (volunteerId) => {
//   try {
//     const connection = await pool.getConnection();
//     const sql = `DELETE FROM volunteer WHERE id = ?`;
//     const [result] = await connection.execute(sql, [volunteerId]);
//     return result;
//   } catch (err) {
//     throw err;
//   }
// };

// module.exports = {
//   addNewVolunteer,
//   getVolunteerById,
//   getAllVolunteers,
//   updateVolunteerById,
//   deleteVolunteerById,
// };
