const express = require("express");
const router = express.Router();
const verifyToken = require(`./../../middlewares/verifyJwt`);
router.use(verifyToken);
router.use(express.json());

const getNews = require(`./../newsNow/getNewsApi`);

router.get("/", getNews.getNewsApi);
module.exports = router;
