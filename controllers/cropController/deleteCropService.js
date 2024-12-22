const { deleteCropByCropIdService } = require(`../../services/CropServices/deleteCropService`);

const deleteCropByCropIdController = async (req, res) => {
  const userId = req.userId;
  const cropId = req.params.id;
  
  try {
    await deleteCropByCropIdService(userId, cropId);
    res.status(204).end();
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to delete Crop",
      error: error.message,
    });
  }
};

module.exports = { deleteCropByCropIdController };
