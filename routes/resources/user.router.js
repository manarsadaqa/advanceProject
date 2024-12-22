const router = require("express").Router();
const verifyToken = require(`../../middlewares/verifyJwt`);
router.use(verifyToken);

const {
  createResource,
  getResourceByName,
  getResources,
  updateResource,
  deleteResource,
  getResource,
  getResourceByUserId
} = require("../../controllers/resources/user.controller");

router.post("/:user_id",createResource); // create a new resource
router.get("/resources",getResources);
//router.get("/:user_id",getResourceByName);
router.get("/:param",getResource);
router.patch("/:user_id",updateResource);
router.delete("/:id",deleteResource);
 
module.exports = router;
