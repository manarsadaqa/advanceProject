const bycrpt = require("bcrypt");
//const { findUser } = require("./../../models/userModle");
const {
  validateCredentials,
} = require("../../services/authenticationServices/loginService");
const tokenUtils = require(`./../../utils/tokenUtils`);
const {
  convertTimeToMilliseconds,
} = require(`./../../utils/millisecondsConverter`);

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await validateCredentials(username, password);
    console.log(user);
    const accessToken = tokenUtils.generateAccessToken(user.id);
    const refreshToken = tokenUtils.generateRefreshToken(user.id);
    const refreshTokenExpiration = process.env.REFRESH_TOKEN_SECRET_EXPIRATION;

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: convertTimeToMilliseconds(refreshTokenExpiration), //  the vaildity of cookie ==> 100ms * 60 * 60 * 24 *7 = 7days
    });
    res.status(200).json({
      massage: "Login successful!",
      accessToken,
    });
  } catch (error) {
    res.status(401).json({ message: `${error.message}` });
  }
};

module.exports = { login };
