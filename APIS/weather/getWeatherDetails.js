const axios = require("axios");
const { getUsersLocation } = require(`./../../models/locationModle`);

const getWeatherDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const userlocation = await getUsersLocation([userId]);
    const user_city = userlocation[0].city_name;
    const apiKey = `377f77d065694eb6956165325241106`;
    const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${user_city}&aqi=no`;
    const response = await axios.get(BASE_URL);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = { getWeatherDetails };
