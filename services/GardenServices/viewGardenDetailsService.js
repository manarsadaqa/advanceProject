const {
  getAllAvailableUserGarden,
  getGardenByGardenId,
} = require(`../../models/gardenModel`);

const viewGardenDetailsService = async (userId) => {
  try {
    const garden = await getAllAvailableUserGarden(userId);
    return garden;
  } catch (err) {
    throw err;
  }
};

const viewGardenByGardenIdService = async (userId, projectId) => {
  try {
    const garden = await getGardenByGardenId(userId, projectId);
    if (garden.length === 0) {
      const error = new Error("garden Not Found !");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  viewGardenDetailsService,
  viewGardenByGardenIdService,
};
