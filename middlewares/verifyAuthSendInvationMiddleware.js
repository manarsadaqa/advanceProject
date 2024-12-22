const { getGardenCreator } = require(`./../models/gardenModel`);
const { getAllAvailableGardensId } = require(`./../models/gardenModel`);

const verifyAuthInvation = async (req, res, next) => {
  try {
    const loginUserId = req.userId;
    const gardenid = req.params.id;
    const creatorId = await getGardenCreator(gardenid);

    const foundProjects = await getAllAvailableGardensId(gardenid);
    const isProjectExists = foundProjects.length != 0;
    if (!isProjectExists) {
      return res.status(409).json({
        massage: "garden dose not exist", // you are not allowed to go there
      });
    }

    const isAuthorized = creatorId[0].creatorUserID === loginUserId;
    if (!isAuthorized) {
      return res.status(401).json({
        massage: "Unauthorized you are not garden creator", // you are not allowed to go there
      });
    }

    next();
  } catch (error) {
    throw error;
  }
};

module.exports = { verifyAuthInvation };
