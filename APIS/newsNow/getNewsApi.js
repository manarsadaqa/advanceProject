const axios = require("axios");
const {getUsersLocation } = require(`./../../models/locationModle`);
const getNewsApi = async (req, res) => {
  const userId = req.userId;
  const userlocation = await getUsersLocation([userId]);
  const user_city = userlocation[0].city_name;
  const newsDetails = {
    method: "POST",
    url: "https://newsnow.p.rapidapi.com/newsv2",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "090b91da4fmshf8f22c0267668e3p1f8950jsn81d78ae33b7d",
      "X-RapidAPI-Host": "newsnow.p.rapidapi.com",
    },
    data: {
      query: "garden",
      time_bounded: true,
      from_date: "01/06/2024",
      to_date: "30/12/2024",
      location: user_city,
      language: "en",
      page: 1,
    },
  };

  try {
    const response = await axios.request(newsDetails);
    res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getNewsApi };
