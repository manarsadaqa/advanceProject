const { deleteInvitation } = require(`../../models/invationModle`);
const deleteInvationsService = async (invitationId) => {
  try {
    await deleteInvitation(invitationId);
  } catch (error) {
    throw error;
  }
};
module.exports = { deleteInvationsService };
