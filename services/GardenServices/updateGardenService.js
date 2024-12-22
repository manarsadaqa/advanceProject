const { updateGardenByGardenId } = require(`../../models/gardenModel`);

const updateGardenService = async (userId, GardenId, Garden) => {
  try {
    const updatedGarden = await updateGardenByGardenId(
      userId,
      GardenId,
      Garden
    );

    return updatedGarden;
  } catch (error) {
    throw error;
  }
};

module.exports = { updateGardenService };
