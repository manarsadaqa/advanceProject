const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyJwt");
const { createCrop } = require("../controllers/cropController/createCropController");
const { getAllCropsByUserId, getCropById, deleteCropById, updateCropById } = require("../models/cropModel");

router.use(verifyToken);

router.post("", createCrop);

router.get("/crops", async (req, res) => {
  try {
    console.log("User ID:", req.userId); // Debugging line
    const crops = await getAllCropsByUserId(req.userId);
    console.log("Fetched Crops:", crops); // Debugging line
    res.status(200).json({
      success: true,
      crops,
    });
  } catch (error) {
    console.error("Error fetching crops:", error); // Debugging line
    res.status(500).json({
      success: false,
      message: "Failed to fetch crops",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const crop = await getCropById(req.params.id);
    res.status(200).json({
      success: true,
      crop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch crop",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteCropById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Crop deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete crop",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedFields = req.body;
    const result = await updateCropById(req.params.id, updatedFields);
    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update crop",
      error: error.message,
    });
  }
});

module.exports = router;
