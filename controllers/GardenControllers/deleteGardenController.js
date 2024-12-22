const {
  deleteGardenByGardenIdService,
} = require(`../../services/GardenServices/deleteGardenService`);

const deleteGardenByGardenIdController = async (req, res) => {
  const userId = req.userId;
  const GardenId = req.params.id;
  try {
    await deleteGardenByGardenIdService(userId, GardenId);
    res.status(204).end();
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to delete Garden",
      error: error.message,
    });
  }
};

module.exports = { deleteGardenByGardenIdController };
