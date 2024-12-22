const { createCropService } = require("../../services/CropServices/createCropService");

const createCrop = async (req, res) => {
  const {
    name,
    user_id,
    garden_id,
    planting_date,
    harvest_date,
    notes,
    crop_previous,
    crop_next,
  } = req.body;

  try {
    const crop = {
      name,
      user_id,
      garden_id,
      planting_date,
      harvest_date,
      notes,
      crop_previous,
      crop_next,
    };

    const newCrop = await createCropService(crop);
    res.status(201).json({
      success: true,
      message: "Crop created successfully",
      cropDetails: newCrop,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to create Crop",
      error: error.message,
    });
  }
};

module.exports = { createCrop };
