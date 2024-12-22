const { Crop } = require('../../models/cropModel');

const deleteCropByCropIdService = async (userId, cropId) => {
  // Assuming you have a function to find and delete a crop by its ID and user ID
  const crop = await Crop.findOne({ where: { id: cropId, user_id: userId } });

  if (!crop) {
    const error = new Error("Crop not found or you don't have permission to delete this crop");
    error.status = 404;
    throw error;
  }

  await crop.destroy();
};

module.exports = { deleteCropByCropIdService };
