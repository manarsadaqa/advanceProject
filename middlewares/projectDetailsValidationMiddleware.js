const { body, validationResult } = require("express-validator");

const validateProjectData = () => {
  return [
    body("garden_name")
      .matches(/^[a-zA-Z\s]*$/)
      .withMessage("garden name can only contain letters")
      .isLength({ min: 5 })
      .withMessage("garden name must be at least 5 characters long"),

    body("growing_conditions")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("growing_conditions can only contain letters")
      .isLength({ min: 10 })
      .withMessage("growing_conditions  must be at least 10 characters long"),

    body("project_materials")
      .isArray({ min: 1 })
      .withMessage("At least one project material is required"),
    body("project_materials.*.name")
      .notEmpty()
      .withMessage("Material name is required"),
    body("project_materials.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive integer"),

    body("project_materials.*.unit").notEmpty().withMessage("Unit is required"),

    body("project_tools")
      .isArray({ min: 1 })
      .withMessage("At least one project tool is required"),
    // body("estimated_duration_in_days")
    //   .isFloat({ min: 0.1 })
    //   .withMessage("Estimated duration must be a positive number"),
    body("creation_date")
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("Creation date must be in format YYYY-MM-DD"),
    body("image_url").isURL().withMessage("Image URL is not valid"),

    (req, res, next) => {
      const errors = validationResult(req);
      if ("creatorUserID" in req.body) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "You cannot include the creatorUserID field in the request body.",
          });
      }
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((err) => err.msg) });
      }
      next();
    },
  ];
};

module.exports = validateProjectData;
