const {
    create,
    getResourceByName,
    getResources,
    updateResource,
    deleteResource,
    getResourceByUserId
  } = require("../../services/resources/user.service");



  
  module.exports = {
    createResource: (req, res) => {
      const userID = req.userId; // The currently authenticated user's ID
      const body = req.body;
      const user_id = req.params.user_id; // The user_id specified in the route parameters
      
      // Check if userID matches user_id from route parameters
      if (parseInt(userID, 10) !== parseInt(user_id, 10)) {
        // If they don't match, return an authorization error
        return res.status(403).json({
            success: 0,
            message: "Unauthorized: You can only create resources for your own account."
        });
    }
      
      create(body, user_id, (err, results) => {
          if (err) {
              console.log(err);
              return res.status(500).json({
                  success: 0,
                  message: "Database connection error"
              });
          }
  
          // Check if the tool already exists message was returned
          if (results && results.message === "Tool already exists") {
              return res.status(409).json({ // HTTP status code 409: Conflict
                  success: 0,
                  message: "Tool already exists"
              });
          }
  
          return res.status(200).json({
              success: 1,
              message: "Tool added successfully"
          });
      });
  },
  

  getResource: (req, res) => {
    const param = req.params.param;
    const userID = req.userId; // The currently authenticated user's ID

    const isNumeric = (str) => {
        return !isNaN(str) && !isNaN(parseFloat(str));
    };

    if (isNumeric(param)) {
        // Check if the requested user_id matches the authenticated user's ID
        if (parseInt(param, 10) !== parseInt(userID, 10)) {
            // If they don't match, return an authorization error
            return res.status(403).json({
                success: 0,
                message: "Unauthorized: You can only access your own resources."
            });
        }

        getResourceByUserId(param, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results || results.length === 0) { // Ensures results are not empty
                return res.status(404).json({
                    success: 0,
                    message: "Resources not found for the user"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    } else {
        getResourceByName(param, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results || results.length === 0) { // Handles not found situations
                return res.status(404).json({
                    success: 0,
                    message: "Tool Name not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
},



getResources: (req, res) => {
    getResources((err, results) => { // استدعاء دالة الخدمة لاسترجاع الموارد
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
                message: "No resources found"
            });
        }
        return res.json({
            success: 1,
            data: results
        });
    });
},

    updateResource: (req, res) => {
      const userID = req.userId; // Make sure this is correctly populated from your auth middleware
      const body = req.body;
  
      updateResource(body, userID, (err, results) => { // Pass userID as an argument
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
                  message: "Resource not found or no changes made"
              });
          }
          return res.json({
              success: 1,
              message: "Updated successfully"
          });
      }
    
    
    );
  },
  
  deleteResource: (req, res) => {
    const id = req.params.id;
    const userID = req.userId; // Make sure this is populated from your authentication middleware

    deleteResource(id, userID, (err, results) => {
        if (err) {
            console.log(err);
            let statusCode = 500;
            let message = "Database connection error";

            if (err.message === "Resource not found.") {
                statusCode = 404;
                message = "Resource Not Found";
            } else if (err.message === "Unauthorized: You can only delete your own resources.") {
                statusCode = 403;
                message = "Unauthorized: You can only delete your own resources.";
            }

            return res.status(statusCode).json({
                success: 0,
                message: message
            });
        }
        if (!results) {
            // This condition will now effectively never be true because of the checks in the service
            return res.status(404).json({
                success: 0,
                message: "Resource Not Found"
            });
        }
        return res.json({
            success: 1,
            message: "Resource deleted successfully"
        });
    });
},

  };
  
