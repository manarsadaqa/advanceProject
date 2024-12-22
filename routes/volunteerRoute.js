const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyJwt");

const createVolunteerService = require("../controllers/VolunteerController/createVolunteerController");
const viewVolunteerDetailsController = require("../controllers/VolunteerController/viewVolunteerDetailsController");
const deleteVolunteerController = require("../controllers/VolunteerController/deleteVolunteerController");
const updateVolunteerController = require("../controllers/VolunteerController/updateVolunteerController");

router.use(verifyToken);

router
  .post("/", createVolunteerService.createVolunteer)
  .get("/", viewVolunteerDetailsController.viewVolunteerDetailsController)
  .get("/:id", viewVolunteerDetailsController.viewVolunteerById)
  .delete("/:id", deleteVolunteerController.deleteVolunteerById)
  .patch("/:id", updateVolunteerController.updateVolunteerById);

module.exports = router;
