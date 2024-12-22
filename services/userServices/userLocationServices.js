const { getAllUsers } = require(`./../../models/userModle`);
const {
  getUsersLocation,
  addNewCity,
  addNewCountry,
  getAvailableCities,
  getAvailableCountry,
  getAvailableCountryIds,
  getAvailableCitiesIds,
  updateUserLocation,
} = require(`./../../models/locationModle`);
const getUsersLocationServices = async () => {
  try {
    const users = await getAllUsers();
    console.log(users);
    const usersIds = users.map((user) => user.id);
    console.log(usersIds);
    const usersLocations = await getUsersLocation(usersIds);
    return usersLocations;
  } catch (error) {
    throw error;
  }
};

const getUserLocationService = async (userId) => {
  try {
    const userLocations = await getUsersLocation([userId]);
    return userLocations;
  } catch (error) {
    throw error;
  }
};

const addNewCityService = async (cityName) => {
  try {
    const cities = await getAvailableCities();
    const citiesName = cities.map((city) => city.name);
    if (citiesName.includes(cityName)) {
      const error = new Error("city already exists.");
      error.status = 404;
      throw error;
    }
    await addNewCity(cityName);
    return;
  } catch (error) {
    throw error;
  }
};

const addNewCountryService = async (countryName) => {
  try {
    const countries = await getAvailableCountry();
    const countriesName = countries.map((country) => country.name);
    if (countriesName.includes(countryName)) {
      const error = new Error("country already exists.");
      error.status = 404;
      throw error;
    }
    await addNewCountry(countryName);
    return;
  } catch (error) {
    throw error;
  }
};

const updateUserLocationService = async (userId, countryId, cityId) => {
  try {
    const countries = await getAvailableCountryIds();
    const cities = await getAvailableCitiesIds();

    console.log(countries, cities);
    const countriesIds = countries.map((country) => country.id);
    const citiesIds = cities.map((city) => city.id);
    if (!countriesIds.includes(countryId)) {
      const error = new Error("country dose not exist.");
      error.status = 404;
      throw error;
    }
    if (!citiesIds.includes(cityId)) {
      const error = new Error("city dose not exist.");
      error.status = 404;
      throw error;
    }
    await updateUserLocation(userId, cityId, countryId);
    return;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getUsersLocationServices,
  getUserLocationService,
  addNewCityService,
  addNewCountryService,
  updateUserLocationService,
};
