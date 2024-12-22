const express = require("express");
const router = express.Router();

const BASE_URL = "./../controllers";

require("dotenv").config();

const loginController = require(`./../controllers/authenticationControllers/loginController`);
const validateRegister = require("../middlewares/userDataValidationMiddleware");
const registerController = require(`./../controllers/authenticationControllers/registerController`);
const logout = require("./../controllers/authenticationControllers/logoutController");
const {
  refreshAccessToken,
} = require("./../controllers/authenticationControllers/refreshTokenController");

router.use(express.json());
router.post("/register", validateRegister(), registerController.register);
router.post("/login", loginController.login);

router.get("/refresh", refreshAccessToken);

router.post("/logout", logout);

module.exports = router;
