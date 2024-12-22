const { getGardenCreator } = require(`./../models/gardenModel`);
const { getAllAvailableGardensId } = require(`./../models/gardenModel`);

const verifyAuthProject = async (req, res, next) => {
  try {
    const loginUserId = req.userId;
    const GardenId = req.params.id;
    const creatorId = await getGardenCreator(GardenId);

    const foundGarden = await getAllAvailableGardensId(GardenId);
    const isGardenExists = foundGarden.length != 0;
    if (!isGardenExists) {
      return res.status(409).json({
        success: false,
        massage: "Garden dose not exist", // you are not allowed to go there
      });
    }
    const isAuthorized = creatorId[0].creatorUserID === loginUserId;
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        massage: "Unauthorized you are not Garden creator", // you are not allowed to go there
      });
    }

    next();
  } catch (error) {
    throw error;
  }
};

module.exports = { verifyAuthProject };
