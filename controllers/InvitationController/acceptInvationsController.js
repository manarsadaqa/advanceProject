const {
  acceptInvationsService,
} = require(`../../services/InvitationServices/acceptInvationsService`);
const acceptInvationsController = async (req, res) => {
  try {
    const userId = req.body.user_id; // تأكد من أنك ترسل user_id كـ JSON
    const invationId = parseInt(req.params.invitation_id);

    console.log(`acceptInvationsController called with userId=${userId} and invationId=${invationId}`);
    await acceptInvationsService(userId, invationId);
    res.status(200).json({
      success: true,
      msg: "Invitation accepted successfully",
    });
  } catch (error) {
    console.error(`Controller Error: ${error.message}`);
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to accept invitation",
      error: error.message,
    });
  }
};

 

 

module.exports = { acceptInvationsController };
