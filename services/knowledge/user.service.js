const pool = require("../../models/databaseold");

module.exports = {
  createKnowledge: (data, user_id, callBack) => {
    pool.query(
      `INSERT INTO advance.knowledge (garden_name, best_practices, guides, description, tutorials, Date, category, name, creatorUserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.garden_name,
        data.best_practices,
        data.guides,
        data.description,
        data.tutorials,
        data.Date,
        data.category,
        data.name,
        user_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getKnowledgeById: (idKnowledge, callBack) => {
    pool.query(
      `SELECT * FROM advance.knowledge WHERE idKnowledge = ?`,
      [idKnowledge],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.length === 0) {
          return callBack(null, null); // Indicates no resource found
        }
        return callBack(null, results[0]);
      }
    );
  },

  getKnowledgeByUserId: (creatorUserID, callBack) => {
    pool.query(
      `SELECT * FROM advance.knowledge WHERE creatorUserID = ?`,
      [creatorUserID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.length === 0) {
          return callBack(null, null); // Indicates no resource found
        }
        return callBack(null, results);
      }
    );
  },

  updateKnowledge: (data, user_id, callBack) => {
    pool.query(
      `UPDATE advance.knowledge SET garden_name=?, best_practices=?, guides=?, description=?, tutorials=?, Date=?, category=?, name=? WHERE idKnowledge = ?`,
      [
        data.garden_name,
        data.best_practices,
        data.guides,
        data.description,
        data.tutorials,
        data.Date,
        data.category,
        data.name,
        data.idKnowledge
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows === 0) {
          return callBack(new Error("Unauthorized or resource not found."));
        }
        return callBack(null, results);
      }
    );
  },

  deleteKnowledge: (id, userID, callBack) => {
    // First, check if the resource exists and belongs to the user
    pool.query(
      `SELECT creatorUserID FROM advance.knowledge WHERE idKnowledge = ?`,
      [id],
      (selectError, selectResults) => {
        if (selectError) {
          console.log('Select Error:', selectError);
          return callBack(selectError);
        }
        if (selectResults.length === 0) {
          console.log('Knowledge not found for id:', id);
          return callBack(new Error("Knowledge not found."));
        }
        
        const creatorUserID = selectResults[0].creatorUserID;
        console.log(`Creator User ID: ${creatorUserID}, Request User ID: ${userID}`);

        if (creatorUserID !== userID) {
          console.log('Unauthorized attempt by user:', userID);
          return callBack(new Error("Unauthorized: You can only delete your own knowledge."));
        }

        // Proceed with deletion since the user is authorized
        pool.query(
          `DELETE FROM advance.knowledge WHERE idKnowledge = ?`,
          [id],
          (error, results) => {
            if (error) {
              console.log('Delete Error:', error);
              return callBack(error);
            }
            if (results.affectedRows === 0) {
              console.log('Knowledge not deleted, possible concurrent deletion:', id);
              return callBack(new Error("Knowledge not found."));
            }
            return callBack(null, results);
          }
        );
      }
    );
  },

  getAllKnowledge: (callBack) => {
    pool.query(
      `SELECT * FROM advance.knowledge`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
