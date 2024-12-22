const pool = require("../../models/databaseold");

module.exports = {
  create: (data, user_id, callBack) => {
    // First, check if a resource with the same name already exists
    pool.query(
      `SELECT * FROM resources WHERE name = ? AND user_id= ?`,
      [data.name,
      user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
  
        // If a resource is found, return a message indicating it already exists
        if (results.length > 0) {
          return callBack(null, { message: "Tool already exists" });
        } else {
          // If no existing resource is found, proceed to create a new one
          pool.query(
            `INSERT INTO resources(name, available, user_id, description, toolstatus, price) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              data.name,
              data.available,
              user_id,
              data.description,
              data.toolstatus,
              data.price
            ],
            (error, results, fields) => {
              if (error) {
                return callBack(error);
              }
              return callBack(null, results);
            }
          );
        }
      }
    );
  },

  getResources: callBack => {
    pool.query(
      `SELECT id, name, available, user_id, description, toolstatus, price FROM resources`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

    getResourceByName: (param, callBack) => {
      pool.query(
        `SELECT * FROM resources WHERE name = ?`,
        [param],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          // Check if results array is empty, meaning the resource was not found
          if (results.length === 0) {
            return callBack(null, null);  // Call back with null error and null results to indicate not found
          }
          return callBack(null, results);  // Return the first result if found
        }
      );
    },
    
    getResourceByUserId: (param, callBack) => {
      pool.query(
        `select * from resources where user_id = ?`,
        [param],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },


    updateResource: (data, userID, callBack) => {
      // First, verify that the resource belongs to the user
      pool.query(
          `SELECT user_id FROM resources WHERE id = ?`,
          [data.id],
          (selectError, selectResults) => {
              if (selectError) {
                  return callBack(selectError);
              }
              if (selectResults.length === 0) {
                  return callBack(new Error("Resource not found."));
              }
              if (selectResults[0].user_id !== userID) {
                  return callBack(new Error("Unauthorized: You can only update your own resources."));
              }
  
              // Proceed with the update since the user is verified
              pool.query(
                  `UPDATE resources SET name=?, available=?, description=?, toolstatus=?, price=? WHERE id = ?`,
                  [
                      data.name,
                      data.available,
                      data.description,
                      data.toolstatus,
                      data.price,
                      data.id
                  ],
                  (error, results) => {
                      if (error) {
                          return callBack(error);
                      }
                      if (results.affectedRows === 0) {
                          // This condition might never be true due to earlier checks, but kept for safety
                          return callBack(null, null); // Indicates no row was updated
                      }
                      return callBack(null, results);
                  }
              );
          }
      );
  },
  

  deleteResource: (id, userID, callBack) => {
    // First, check if the resource exists and belongs to the user
    pool.query(
        `SELECT user_id FROM resources WHERE id = ?`,
        [id],
        (selectError, selectResults) => {
            if (selectError) {
                return callBack(selectError);
            }
            if (selectResults.length === 0) {
                return callBack(new Error("Resource not found."));
            }
            if (selectResults[0].user_id !== userID) {
                return callBack(new Error("Unauthorized: You can only delete your own resources."));
            }

            // Proceed with deletion since the user is authorized
            pool.query(
                `DELETE FROM resources WHERE id = ?`,
                [id],
                (error, results) => {
                    if (error) {
                        return callBack(error);
                    }
                    if (results.affectedRows === 0) {
                        // This should not occur due to the checks above
                        return callBack(null, null); // Indicates no row was deleted
                    }
                    return callBack(null, results);
                }
            );
        }
    );
},

  };
  