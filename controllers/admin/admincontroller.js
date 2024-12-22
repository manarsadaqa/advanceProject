const bycrpt = require("bcrypt");
const tokenUtils = require(`../utils/tokenutils`);
const { convertTimeToMilliseconds } = require(`../utils/millisecondsConverter`);

const adminservice = require("./adminservice");
const validateCredentials = async (username, password) => {
  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  try {
    const adminuser = await adminservice.finduser(username);
    if (!adminuser) {
      throw new Error("Invalid username password combination");
    }


    return adminuser;
  } catch (error) {
    throw new Error("Authentication failed: " + error.message);
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await validateCredentials(username, password);
    const accessToken = tokenUtils.generateAccessToken(admin.id);
    const refreshToken = tokenUtils.generateRefreshToken(admin.id);
    const refreshTokenExpiration = "1h";

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
const logout = (req, res) => {
  // Use cookie-parser middleware to parse cookies

  // Parse cookies from the request object
  const cookies = req.cookies;
  // Check if the JWT cookie exists
  if (!cookies.jwt) {
    return res.status(401).json({ message: "You are not currently logged in" });
  }

  // Clear the JWT cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  // Send a response indicating successful logout with a message
  return res.status(200).json({ message: "Logout successful" });
};
module.exports = {
  login,
  logout,
};
