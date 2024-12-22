const { body, validationResult } = require("express-validator");
const { getAvailableSkills } = require("./../models/skillModle");
const {
  getAvailableCountry,
  getAvailableCities,
} = require("./../models/locationModle");

// regex : (/                  /)
// ^ : start of the string
// ^[a-zA-Z0-9_] : make matching if the string contain letters a-z and A-Z , number 0-9 , underscore.
// $ end of the string

const validateRegistrationData = () => {
  return [
    body("username")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        "Username can only contain letters, numbers, and underscores"
      ),
    body("first_name")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("First name can only contain letters and spaces"),
    body("last_name")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Last name can only contain letters and spaces"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),

    body("skills").custom(async (skills, { req }) => {
      const availableSkills = await getAvailableSkills();
      const availableSkillsName = availableSkills.map((skill) => skill.name);

      const incorrectSkills = [];
      for (const skill of skills) {
        if (!availableSkillsName.includes(skill)) {
          incorrectSkills.push(skill);
        }
      }

      if (incorrectSkills.length > 0) {
        const errorObject = {
          errors: [
            `Skill '${incorrectSkills.join(", ")}' is not available skill`,
          ],
          availableSkills: availableSkillsName,
        };
        throw errorObject;
      }
    }),
    body("location").custom(async (location, { req }) => {
      const availableCountry = await getAvailableCountry();
      const availableCountriesName = availableCountry.map(
        (skill) => skill.name
      );

      if (!availableCountriesName.includes(location.country)) {
        const errorObject = {
          errors: [`country '${location.country}' is not available country`],
          availableCountries: availableCountriesName,
        };
        throw errorObject;
      }
      const availableCities = await getAvailableCities();
      const availableCitiesName = availableCities.map((city) => city.name);
      if (!availableCitiesName.includes(location.city)) {
        const errorObject = {
          errors: [`city '${location.city}' is not available city`],
          availableCities: availableCitiesName,
        };
        throw errorObject;
      }
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((err) => err.msg) });
      }
      next();
    },
  ];
};

module.exports = validateRegistrationData;
