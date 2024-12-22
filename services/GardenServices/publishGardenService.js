const {
  publishGarden,
  getGardenStatus,
} = require(`../../models/gardenModel`);
const publishGardenService = async (GardenId, userID) => {
  try {
    const projectStatus = await getGardenStatus(GardenId, userID);
    const status = projectStatus[0].status;
    if (status === "published") {
      const error = new Error("Garden is Already Published !");
      error.status = 409;
      throw error;
    }
    await publishGarden(GardenId, userID);
  } catch (error) {
    throw error;
  }
};
module.exports = { publishGardenService };
