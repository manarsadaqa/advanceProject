 const router = require("express").Router();
const verifyToken = require(`../../middlewares/verifyJwt`);
router.use(verifyToken);

const {
  createKnowledge,
  getKnowledgeById,
  getKnowledgeByUserId,
  updateKnowledge,
  deleteKnowledge,
  getAllKnowledge // Add the new controller
} = require("../../controllers/knowledge/user.controller");

router.post("/:user_id", createKnowledge); // Create a new knowledge resource
router.get("/:idKnowledge", getKnowledgeById); // Get knowledge resource by ID
router.get("/user/:creatorUserID", getKnowledgeByUserId); // Get all knowledge resources by user ID
router.patch("/:user_id", updateKnowledge); // Update a knowledge resource
router.delete("/:idKnowledge", deleteKnowledge); // Delete a knowledge resource
router.get("/", getAllKnowledge); // Add route to get all knowledge resources

module.exports = router;
