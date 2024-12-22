const {
  addNewGarden,
  getAvailableGardensName,
} = require(`../../models/gardenModel`);
const { getCurrentDate } = require(`../../utils/getCurrentDate`);
const {
  addParticipantsToGarden,
} = require(`../../models/ParticipantsModel`);

const createGardenService = async (garden) => {
  try {
    const foundGarden = await getAvailableGardensName(garden.garden_name);
    const GardenNames = foundGarden.map((proj) => proj.garden_name);

    const isProjectExists = GardenNames.includes(garden.garden_name);
    if (isProjectExists) {
      const error = new Error("Garden with the same name already exists");
      error.status = 409;
      throw error;
    }

    const addedGarden = await addNewGarden(garden);
    const projectId = addedGarden.insertId;

    const membership = {
      project_id: projectId,
      user_id: garden.creatorUserID,
      role: "creator",
      joined_date: getCurrentDate(),
    };
    await addParticipantsToGarden(membership);
    return {
      garden_name: garden.garden_name,
      growing_conditions: garden.growing_conditions,
      creation_date: garden.creation_date,
      image_url: garden.image_url,
      participants:garden.participants
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { createGardenService };
