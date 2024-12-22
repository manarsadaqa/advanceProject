const {
  viewInvationsService,
} = require(`../../services/InvitationServices/viewInvationsService`);

const viewInvationsController = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await viewInvationsService(userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      //  message: "Failed to View Invations",
      massage: error.message,
    });
  }
};

module.exports = { viewInvationsController };
