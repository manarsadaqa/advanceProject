const { createGardenService } = require(`../../services/GardenServices/createGardenService`);

const createGarden = async (req, res) => {
  const {
    garden_name,
    available_plots,
    project_materials,
    project_tools,
    growing_conditions,
    creation_date,
    image_url,
    price,
    country_name,
    participants,
    city_name
  } = req.body;

  const errors = [];
  const alphaSpaceRegex = /^[A-Za-z\s]+$/;

  if (!alphaSpaceRegex.test(growing_conditions)) {
    errors.push("growing_conditions can only contain letters and spaces");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  try {
    const garden = {
      creatorUserID: req.userId,
      garden_name: garden_name,
      country_name: country_name,
      city_name: city_name,
      project_materials: JSON.stringify(project_materials),
      project_tools: JSON.stringify(project_tools),
      available_plots: available_plots,
      participants:participants,
      growing_conditions: growing_conditions,
      creation_date: creation_date,
      image_url: image_url,
      price: price,
    };

    const newGarden = await createGardenService(garden);
    res.status(201).json({
      success: true,
      message: "Garden created successfully",
      projectDetails: newGarden,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to create Garden",
      error: error.message,
    });
  }
};

module.exports = { createGarden };
