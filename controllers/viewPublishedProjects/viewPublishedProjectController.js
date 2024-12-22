const {
  viewPublishedProjectService,
} = require(`./../../services/publishedProjectServices/viewPublishedProjectService`);

const publishedProjectController = async (req, res) => {
  try {
    let filterOptions = {};
    if (Object.keys(req.query).length > 0) {
      filterOptions = req.query;
    }
    const publishedProject = await viewPublishedProjectService(filterOptions);
    if (publishedProject.length == 0) {
      res.status(404).json({
        success: true,
        message: "No Published Projects",
      });
    } else {
      res.status(200).json({
        success: true,
        message: publishedProject,
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to send Invation",
      error: error.message,
    });
  }
};
module.exports = { publishedProjectController };
