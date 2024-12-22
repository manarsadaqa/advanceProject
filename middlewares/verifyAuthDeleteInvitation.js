const { getGardenCreator } = require(`./../models/gardenModel`);
const { getInvitationDetails } = require(`./../models/invationModle`);

const verifyAuthDeleteInvation = async (req, res, next) => {
  try {
    const loginUserId = req.userId;
    const invitationId = req.params.id;
    const invitationDetails = await getInvitationDetails({
      invitation_id: invitationId,
    });

    const isInvitationExists = invitationDetails.length != 0;
    if (!isInvitationExists) {
      return res.status(409).json({
        massage: "Invitation dose not exist",
      });
    }
    const creatorId = await getGardenCreator(invitationDetails[0].garden_id);
    const isAuthorized = creatorId[0].creatorUserID === loginUserId;
    if (!isAuthorized) {
      return res.status(401).json({
        massage: "Unauthorized you are not project creator",
      });
    }

    next();
  } catch (error) {
    throw error;
  }
};

module.exports = { verifyAuthDeleteInvation };
