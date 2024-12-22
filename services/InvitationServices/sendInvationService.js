const { findUser } = require(`../../models/userModle`);
const { getAllAvailableGardensId } = require(`../../models/gardenModel`);
const { createInvation } = require(`../../models/invationModle`);

const {
  getParticipantsInGarden,
  getInvitationDetails,
} = require(`../../models/invationModle`);

const sendInvationService = async (userId, garden_id) => {
  try {
    // البحث عن المستخدم
    const foundUser = await findUser({ id: userId });
    if (foundUser.length === 0) {
      const error = new Error('User does not exist.');
      error.status = 409;
      throw error;
    }

    // البحث عن الحديقة
    const foundGarden = await getAllAvailableGardensId(garden_id);
    if (foundGarden.length === 0) {
      const error = new Error('Garden does not exist.');
      error.status = 404;
      throw error;
    }

    const projectCreatorId = foundGarden[0].creatorUserID;
    if (projectCreatorId === userId) {
      const error = new Error('User is the creator of the garden.');
      error.status = 409;
      throw error;
    }

    // التحقق من وجود دعوة سابقة
    const invitationDetails = await getInvitationDetails({ user_id: userId, garden_id: garden_id });
    if (invitationDetails.length !== 0) {
      const error = new Error('Invitation already sent to the user.');
      error.status = 409;
      throw error;
    }

    // التحقق من أن المستخدم ليس مشاركًا بالفعل في الحديقة
    const participants = await getParticipantsInGarden(garden_id);
    const participantIds = participants.map(participant => participant.user_id);
    if (participantIds.includes(userId)) {
      const error = new Error('User is already a participant of the garden.');
      error.status = 409;
      throw error;
    }

    // إنشاء دعوة جديدة
    await createInvation(userId, garden_id);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendInvationService };
