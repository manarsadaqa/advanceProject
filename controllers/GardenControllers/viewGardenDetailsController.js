const {
  viewGardenDetailsService,
  viewGardenByGardenIdService,
} = require(`../../services/GardenServices/viewGardenDetailsService`);

const viewGardenDetailsController = async (req, res) => {
  const userId = req.userId;
  try {
    const userProjects = await viewGardenDetailsService(userId);
    if (userProjects.length == 0) {
      res.status(200).json({
        success: true,
        message: "No Garden found for the user",
        projects: {
          total: 0,
          userProjects: [],
        },
      });
    } else {
      userProjects.project_materials = JSON.stringify(
        userProjects.project_materials
      );
      res.status(200).json({
        success: true,
        message: "Garden retrieved successfully",
        projects: {
          total: userProjects.length,
          userProjects,
        },
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to retrieved Garden",
      error: error.message,
    });
  }
};

const viewGardenByGardenIdController = async (req, res) => {
  const userId = req.userId;
  const GardenId = req.params.id;
  console.log(GardenId, userId);
  try {
    const Garden = await viewGardenByGardenIdService(userId, GardenId);

    res.status(200).json({
      success: true,
      message: "Garden retrieved successfully",
      projects: Garden,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to retrieved Garden",
      error: error.message,
    });
  }
};

module.exports = {
  viewGardenDetailsController,
  viewGardenByGardenIdController,
};
