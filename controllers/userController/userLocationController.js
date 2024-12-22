const {
  getUsersLocationServices,
  getUserLocationService,
  addNewCityService,
  addNewCountryService,
  updateUserLocationService,
} = require(`./../../services/userServices/userLocationServices`);
const getUsersLocationController = async (req, res) => {
  try {
    const locations = await getUsersLocationServices();
    res.status(200).json({
      success: true,
      msg: locations,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: "Failed to get  user locations information: " + error.message,
    });
  }
};

const getUserLocationController = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const userLocation = await getUserLocationService(userId);
    res.status(200).json({
      success: true,
      msg: userLocation,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: "Failed to get user location information: " + error.message,
    });
  }
};

const addNewCityController = async (req, res) => {
  try {
    const cityName = req.body.city;
    await addNewCityService(cityName);
    res.status(200).json({
      success: true,
      msg: `city ${cityName} added successfully`,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: "Failed to add new city : " + error.message,
    });
  }
};

const addNewCountryController = async (req, res) => {
  try {
    const countryName = req.body.country;
    await addNewCountryService(countryName);
    res.status(200).json({
      success: true,
      msg: `country ${countryName} added successfully`,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: "Failed to add new country : " + error.message,
    });
  }
};

const updateUserLocationController = async (req, res) => {
  console.log("updateUserLocationController");
  const loginUserID = req.userId;
  const userIdToUpdate = req.params.userId;

  let userID;
  if (userIdToUpdate !== undefined && req.userRole == "admin") {
    console.log("You are an admin.");
    userID = userIdToUpdate;
  } else userID = loginUserID;

  try {
    const countryId = req.body.country_id;
    const cityId = req.body.city_id;

    await updateUserLocationService(userID, countryId, cityId);
    res.status(200).json({
      success: true,
      msg: `user locations  updated successfully`,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: "Failed to add new country : " + error.message,
    });
  }
};

module.exports = {
  getUsersLocationController,
  getUserLocationController,
  addNewCityController,
  addNewCountryController,
  updateUserLocationController,
};
