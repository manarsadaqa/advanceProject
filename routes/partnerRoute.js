const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyJwt");

const createPartnerController = require("../controllers/PartnerController/createPartnerController");
const viewPartnerController = require("../controllers/PartnerController/viewPartnerController");
const deletePartnerController = require("../controllers/PartnerController/deletePartnerController");
const updatePartnerController = require("../controllers/PartnerController/updatePartnerController");

router.use(verifyToken);

router
  .post("/", createPartnerController.createPartner) // This is the POST route
  .get("/:id", viewPartnerController.viewPartnerById)
  .get("/", viewPartnerController.viewAllPartners)
  .delete("/:id", deletePartnerController.deletePartnerByIdController)
  .patch("/:id", updatePartnerController.updatePartnerByIdController);

module.exports = router;
