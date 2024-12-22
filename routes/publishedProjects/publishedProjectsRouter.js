const express = require("express");
const router = express.Router();
const verifyToken = require(`./../../middlewares/verifyJwt`);
router.use(express.json());
router.use(verifyToken);

const {
  publishedProjectController,
} = require(`./../../controllers/viewPublishedProjects/viewPublishedProjectController`);
router.get("/", publishedProjectController);

module.exports = router;
