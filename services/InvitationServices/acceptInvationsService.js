const { acceptInvation } = require(`../../models/invationModle`);
const { getCurrentDate } = require(`../../utils/getCurrentDate`);
const { addParticipantsToGarden } = require(`../../models/ParticipantsModel`);
const { increaseGardenParticipants } = require(`./../../models/gardenModel`);
const { getInvitationDetails } = require(`../../models/invationModle`);
const acceptInvationsService = async (userId, invationId) => {
  try {
    console.log(`acceptInvationsService called with userId=${userId} and invationId=${invationId}`);
    const invationInfo = {
      user_id: userId,
      invitation_id: invationId,
    };
    const invationDetails = await getInvitationDetails(invationInfo);
    console.log(`invationDetails: ${JSON.stringify(invationDetails)}`);
    const isInvationExist = invationDetails.length != 0;

    if (!isInvationExist) {
      const error = new Error("Invitation does not Exist!");
      error.status = 404;
      throw error;
    }
    await acceptInvation(userId, invationId);
    const membership = {
      garden_id: invationDetails[0].garden_id,
      user_id: invationDetails[0].user_id,
      role: "collaborator",
      joined_date: getCurrentDate(),
    };
    await addParticipantsToGarden(membership);
    const projectId = invationDetails[0].garden_id;
    await increaseGardenParticipants(projectId);
  } catch (error) {
    console.error(`Service Error: ${error.message}`);
    throw error;
  }
};

 

module.exports = { acceptInvationsService };
