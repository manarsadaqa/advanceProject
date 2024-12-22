const express = require("express");
const router = express.Router();
const verifyToken = require(`../middlewares/verifyJwt`);

const createGardenService = require(`../controllers/GardenControllers/createGardenController`);
const validateProjectData = require(`../middlewares/projectDetailsValidationMiddleware`);
const viewProjectsDetailsController = require(`../controllers/GardenControllers/viewGardenDetailsController`);
const deleteGardenController = require(`../controllers/GardenControllers/deleteGardenController`);
const updateGardenController = require(`../controllers/GardenControllers/updateGardenController`);

const InvitationController = require(`../controllers/InvitationController/sendInvationController`);
const {
  acceptInvationsController,
} = require(`./../controllers/InvitationController/acceptInvationsController`);

const {
  rejectInvationsController,
} = require(`./../controllers/InvitationController/rejectInvationsController`);
const {
  verifyAuthInvation,
} = require(`./../middlewares/verifyAuthSendInvationMiddleware`);
const {
  verifyAuthDeleteInvation,
} = require(`./../middlewares/verifyAuthDeleteInvitation`);
router.use(verifyToken);
const {
  viewInvationsController,
} = require(`./../controllers/InvitationController/viewInvationsController`);

const {
  deleteInvationsController,
} = require(`./../controllers/InvitationController/deleteInvationsController`);
const {
  publishGardenController,
} = require(`../controllers/GardenControllers/publishGardenController`);

const { verifyAuthProject } = require(`./../middlewares/verifyAuthProject`);

router
  .get(`/invitations`, viewInvationsController)
  .post(`/invitations/:invitationId/accept`, acceptInvationsController)
  .post(`/invitations/:invitationId/reject`, rejectInvationsController);
router

  .post("/", validateProjectData(), createGardenService.createGarden)
  .get("/", viewProjectsDetailsController.viewGardenDetailsController)
  .get("/:id", viewProjectsDetailsController.viewGardenByGardenIdController)

  .post("/:id/publish", verifyAuthProject, publishGardenController)
  .post(
    "/:id/invite",
    verifyAuthInvation,
    InvitationController.sendInvationController
  )
  .delete(
    "/:id/invite/delete",
    verifyAuthDeleteInvation,
    deleteInvationsController
  )

  .delete(
    "/:id",
    verifyAuthProject,
    deleteGardenController.deleteGardenByGardenIdController
  )
  .patch(
    "/:id",
    validateProjectData(),
    verifyAuthProject,
    updateGardenController.updateGardenByGardenIdController
  );

module.exports = router;
