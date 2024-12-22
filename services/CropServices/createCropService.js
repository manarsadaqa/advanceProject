const { addNewCrop } = require("../../models/cropModel");

const createCropService = async (crop) => {
  try {
    const addedCrop = await addNewCrop(crop);
    return addedCrop;
  } catch (err) {
    throw err;
  }
};

module.exports = { createCropService };
