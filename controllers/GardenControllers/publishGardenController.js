const {
  publishGardenService,
} = require(`../../services/GardenServices/publishGardenService`);
const publishGardenController = async (req, res) => {
  const loginUserID = req.userId;
  const GardenId = req.params.id;
  console.log(loginUserID, GardenId);
  try {
    await publishGardenService(GardenId, loginUserID);
    res.status(200).json({
      success: true,
      message: "Garden published successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to publish Garden",
      error: error.message,
    });
  }
};
module.exports = { publishGardenController };
