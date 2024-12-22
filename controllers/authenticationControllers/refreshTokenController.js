const jwt = require("jsonwebtoken");
const { findUser } = require("../../models/userModle");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./env/.env" });

const {
  makeRefreshToTheToken,
} = require("../../services/authenticationServices/refreshTokenService");

const refreshAccessToken = async (req, res) => {
  // Use cookie-parser middleware to parse cookies
  cookieParser()(req, res, () => {});

  // Take the cookies from the browser (request)
  const cookies = req.cookies;

  // Check if the JWT cookie exists
  if (!cookies || !cookies.jwt) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const refreshToken = cookies.jwt;

  const { accessToken, error } = await makeRefreshToTheToken(refreshToken);

  if (error) {
    return res
      .status(error === "Unauthorized" ? 401 : 403)
      .json({ message: error });
  }

  res.json({ accessToken });
};

module.exports = { refreshAccessToken };
