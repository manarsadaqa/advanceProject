const {
  updateGardenService,
} = require(`../../services/GardenServices/updateGardenService`);

const updateGardenByGardenIdController = async (req, res) => {
  const userId = req.userId;
  const GardenId = req.params.id;
  try {
    const updatedGarden = await updateGardenService(
      userId,
      GardenId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Garden updated successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to update Garden",
      error: error.message,
    });
  }
};

module.exports = { updateGardenByGardenIdController };
