const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
  path: "C:/Users/PAVILION/Documents/Advance SE/Project/env ",
});

const generateAccessToken = (userId) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const accessTokenExpiration = process.env.ACCESS_TOKEN_SECRET_EXPIRATION; // Expiration time for the token
  const accessToken = jwt.sign(
    { UserInfo: { id: userId } },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiration,
    }
  );
  return accessToken;
};

const generateRefreshToken = (userId) => {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  const refreshTokenExpiration = process.env.REFRESH_TOKEN_SECRET_EXPIRATION; // Expiration time for the token

  // Generate the refresh token
  const refreshToken = jwt.sign(
    { UserInfo: { id: userId } },
    refreshTokenSecret,
    {
      expiresIn: refreshTokenExpiration,
    }
  );

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
