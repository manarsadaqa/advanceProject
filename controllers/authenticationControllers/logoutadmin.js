const bycrpt = require("bcrypt");
const { validateCredentials } = require("./../../services/loginService");
const tokenUtils = require(`./../../utils/tokenUtils`);
const {
  convertTimeToMilliseconds,
} = require(`./../../utils/millisecondsConverter`);


const logout = (req, res) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  // Use cookie-parser middleware to parse cookies
  cookieParser()(req, res, () => {});

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

module.exports = logout;