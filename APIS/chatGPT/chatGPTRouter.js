const express = require("express");
const router = express.Router();
const verifyToken = require(`./../../middlewares/verifyJwt`);
router.use(verifyToken);
router.use(express.json());

const chatGPT = require(`./../chatGPT/chatGPT`);

router.get("/", chatGPT.chat);
module.exports = router;
