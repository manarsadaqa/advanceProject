const {
  sendInvationService,
} = require(`../../services/InvitationServices/sendInvationService`);


const sendInvationController = async (req, res) => {
  try {
    console.log("Received body:", req.body); // طباعة الجسم المستلم
    console.log("Received params:", req.params); // طباعة البارامترات المستلمة

    const userId = req.body.user_id;
    const gardenId = req.params.id; // تأكد من استخدام id بدلاً من garden_id

    // التحقق من المدخلات
    if (!userId || !gardenId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: user_id or garden_id",
      });
    }

    await sendInvationService(userId, gardenId);
    res.status(200).json({
      success: true,
      msg: "The invitation was sent to the user successfully",
      invationDetails: {
        gardenId: gardenId,
        sentToTheUser: userId,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to send Invitation",
      error: error.message,
    });
  }
};
module.exports = { sendInvationController };
