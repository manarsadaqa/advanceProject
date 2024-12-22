const {
  deleteInvationsService,
} = require(`../../services/InvitationServices/deleteInvationsService`);
const deleteInvationsController = async (req, res) => {
  try {
    const invitationId = req.params.id;

    await deleteInvationsService(invitationId);
    res.status(204).json({
      msg: "Invation deleted successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to send Invation",
      error: error.message,
    });
  }
};
module.exports = { deleteInvationsController };
