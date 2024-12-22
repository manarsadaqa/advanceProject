const express = require("express");
const router = express.Router();
const verifyToken = require(`./../../middlewares/verifyJwt`);
router.use(verifyToken);
router.use(express.json());

const { getWeatherDetails } = require(`./../weather/getWeatherDetails`);

router.get("/", getWeatherDetails);
module.exports = router;
