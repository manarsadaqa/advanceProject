const {
  deleteGardenByGardenId,
  getAllAvailableGardensId,
} = require(`../../models/gardenModel`);

const deleteGardenByGardenIdService = async (userId, GardenId) => {
  try {
    const foundGarden = await getAllAvailableGardensId(GardenId);
    const isGardenExists = foundGarden.length != 0;
    if (!isGardenExists) {
      const error = new Error("Garden dose not exist to delete it ");
      error.status = 409;
      throw error;
    }
    await deleteGardenByGardenId(userId, GardenId);
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteGardenByGardenIdService };
