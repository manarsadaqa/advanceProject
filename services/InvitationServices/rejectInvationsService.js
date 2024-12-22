const { rejectInvitation } = require(`../../models/invationModle`);
const { getInvitationDetails } = require(`../../models/invationModle`);

const rejectInvationsService = async (userId, invationId) => {
  try {
    const invationInfo = {
      user_id: userId,
      invitation_id: invationId,
    };
    const invationDetails = await getInvitationDetails(invationInfo);

    const isInvationExist = invationDetails.length != 0;

    if (!isInvationExist) {
      const error = new Error("Invation dose not Exist !");
      error.status = 404;
      throw error;
    }

    await rejectInvitation(userId, invationId);
  } catch (error) {
    throw error;
  }
};

module.exports = { rejectInvationsService };
