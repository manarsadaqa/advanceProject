const {
  rejectInvationsService,
} = require(`./../../services/InvitationServices/rejectInvationsService`);
const rejectInvationsController = async (req, res) => {
  try {
    const userId = req.userId;
    const invationId = parseInt(req.params.invitationId);
    await rejectInvationsService(userId, invationId);
    res.status(200).json({
      success: true,
      msg: "Invitation rejected successfully ",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to send Invation",
      error: error.message,
    });
  }
};
module.exports = { rejectInvationsController };
