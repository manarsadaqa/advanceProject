const { updateCropService } = require(`../../services/CropServices/updateCropService`);

const updateCropByCropIdController = async (req, res) => {
  const userId = req.userId;
  const cropId = req.params.id;
  const cropData = req.body;

  try {
    const updatedCrop = await updateCropService(userId, cropId, cropData);
    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      cropDetails: updatedCrop,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to update Crop",
      error: error.message,
    });
  }
};

module.exports = { updateCropByCropIdController };
