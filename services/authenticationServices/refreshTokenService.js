const jwt = require("jsonwebtoken");
const { findUser } = require("../../models/userModle");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./env/.env" });

const makeRefreshToTheToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded || !decoded.UserInfo) {
      return { error: "Unauthorized" };
    }

    const [foundUser] = await findUser({ id: decoded.UserInfo.id });

    if (!foundUser) {
      return { error: "Unauthorized" };
    }

    const accessToken = jwt.sign(
      { UserInfo: { id: foundUser.id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRATION }
    );

    return { accessToken };
  } catch (error) {
    return { error: "Forbidden" };
  }
};

module.exports = { makeRefreshToTheToken };
