const registerService = require(`../../services/authenticationServices/registerService`);
const tokenUtils = require(`./../../utils/tokenUtils`);
const {
  convertTimeToMilliseconds,
} = require("./../../utils/millisecondsConverter");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const newUser = await registerService.register(req.body);
    console.log(newUser);

    const accessToken = tokenUtils.generateAccessToken(newUser.userId);
    const refreshToken = tokenUtils.generateRefreshToken(newUser.userId);

    const refreshTokenExpiration = process.env.REFRESH_TOKEN_SECRET_EXPIRATION;

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: convertTimeToMilliseconds(refreshTokenExpiration), //  the vaildity of cookie ==> 100ms * 60 * 60 * 24 *7 = 7days
    });
    // Send back a success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
      accessToken, // Optionally send the access token in the response
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { register };
