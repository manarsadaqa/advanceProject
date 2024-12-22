const {
  createKnowledge,
  getKnowledgeById,
  getKnowledgeByUserId,
  updateKnowledge,
  deleteKnowledge,
  getAllKnowledge // Add the new service function
} = require("../../services/knowledge/user.service");

module.exports = {
  createKnowledge: (req, res) => {
    const userID = req.userId;
    const body = req.body;
    const user_id = req.params.user_id;
    
    if (parseInt(userID, 10) !== parseInt(user_id, 10)) {
      return res.status(403).json({
        success: 0,
        message: "Unauthorized: You can only create resources for your own account."
      });
    }
    
    createKnowledge(body, user_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Knowledge added successfully"
      });
    });
  },
  getKnowledgeById: (req, res) => {
    const idKnowledge = req.params.idKnowledge;
    getKnowledgeById(idKnowledge, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Knowledge not found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  getKnowledgeByUserId: (req, res) => {
    const creatorUserID = req.params.creatorUserID;
    getKnowledgeByUserId(creatorUserID, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
        if (!results || results.length === 0) {
            return res.status(404).json({
                success: 0,
                message: "Knowledge not found for the user"
            });
        }
        return res.json({
            success: 1,
            data: results
        });
    });
  },

  updateKnowledge: (req, res) => {
    const userID = req.userId;
    const body = req.body;
    updateKnowledge(body, userID, (err, results) => {
      if (err) {
        console.log(err);
        let statusCode = 500;
        let message = "Database connection error";
        if (err.message.includes("Unauthorized")) {
          statusCode = 403;
          message = err.message;
        } else if (err.message.includes("Resource not found")) {
          statusCode = 404;
          message = err.message;
        }
        return res.status(statusCode).json({
          success: 0,
          message: message
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Knowledge not found or no changes made"
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfully"
      });
    });
  },

  deleteKnowledge: (req, res) => {
    const id = req.params.idKnowledge;
    const userID = req.userId; // Ensure this is populated from your authentication middleware

    deleteKnowledge(id, userID, (err, results) => {
        if (err) {
            console.log(err);
            let statusCode = 500;
            let message = "Database connection error";

            if (err.message === "Knowledge not found.") {
                statusCode = 404;
                message = "Knowledge Not Found";
            } else if (err.message === "Unauthorized: You can only delete your own knowledge.") {
                statusCode = 403;
                message = "Unauthorized: You can only delete your own knowledge.";
            }

            return res.status(statusCode).json({
                success: 0,
                message: message
            });
        }
        return res.json({
            success: 1,
            message: "Knowledge deleted successfully"
        });
    });
  },

  getAllKnowledge: (req, res) => {
    getAllKnowledge((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  }
};
