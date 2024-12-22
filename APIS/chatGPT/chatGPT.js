const axios = require("axios");

const chat = async (req, res) => {
  const msg = req.body.msg;
  const options = {
    method: "POST",
    url: "https://chatgpt-api8.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "090b91da4fmshf8f22c0267668e3p1f8950jsn81d78ae33b7d",
      "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
    },
    data: [
      {
        content: msg,
        role: "user",
      },
    ],
  };

  try {
    const response = await axios.request(options);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { chat };
