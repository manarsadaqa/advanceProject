const express = require("express");
const router = express.Router();
const getUserController = require(`../controllers/userController/getUserContoller`);
const {
  updateUserDetailsController,
} = require(`./../controllers/userController/updateUserDetailsController`);
const {
  deleteUserController,
} = require(`./../controllers/userController/deleteUserController`);

const verifyToken = require(`./../middlewares/verifyJwt`);
const verifyUserData = require(`./../middlewares/userDataValidationMiddleware`);
const { verifyAdmin } = require(`./../middlewares/verifyAdmin`);
router.use(express.json());
router.use(verifyToken);
const userLocationController = require(`./../controllers/userController/userLocationController`);
//------------------------------------------------------------------------------------------------------
router.post("/location/", userLocationController.updateUserLocationController);
router.post(
  "/location/:userId",
  verifyAdmin,
  userLocationController.updateUserLocationController
);
router.put(
  "/location/city",
  verifyAdmin,
  userLocationController.addNewCityController
);
router.put(
  "/location/country",
  verifyAdmin,
  userLocationController.addNewCountryController
);
router.get(
  "/location",
  verifyAdmin,
  userLocationController.getUsersLocationController
);
router.get(
  "/location/:userId",
  userLocationController.getUserLocationController
);

//------------------------------------------------------------------------------------
router.get("/", getUserController.getAllUsers); // Retrieve a list of all users.
router.get("/:id", getUserController.getUserById);
router.patch("/", verifyUserData(), updateUserDetailsController);
router.patch(
  "/:userId",
  verifyAdmin,
  verifyUserData(),
  updateUserDetailsController
);
router.delete("/", deleteUserController);
router.delete("/:userId", verifyAdmin, deleteUserController); // admin
//------------------------------------------------------------------------------------

module.exports = router;
