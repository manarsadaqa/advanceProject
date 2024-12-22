const express = require("express");
const admincontroller = require("./admincontroller");
const router = express.Router();
router.post("/", admincontroller.login);
router.post("/logout", admincontroller.logout);
module.exports = router;
