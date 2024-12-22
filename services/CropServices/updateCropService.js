const { updateCropByCropId } = require(`../../models/cropModel`);

const updateCropService = async (userId, cropId, crop) => {
  try {
    const updatedCrop = await updateCropByCropId(userId, cropId, crop);
    return updatedCrop;
  } catch (error) {
    throw error;
  }
};

module.exports = { updateCropService };
