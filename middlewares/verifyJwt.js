const ADMIN_ROLE_ID = 5;
const jwt = require("jsonwebtoken");
//server side : i will take it from headers
const verifyJwt = async (req, res, next) => {
  // it have 2 names : either authorization or Authorization
  const authenticateHeader =
    req.headers.authorization || req.headers.Authorization; // "Bearer Token"

  const isTokenExist = authenticateHeader?.startsWith("Bearer ");
  if (!isTokenExist) {
    return res.status(401).json({
      massage: "Unauthorized", // you are not allowed to go there
    });
  }
  const token = authenticateHeader.split(" ")[1]; // ["Bearer ","Token"]

  // you will verify the token come from request with secret token you have in .env.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({
        // you cant access this page ==> tokenInRequest != tokenInServer
        massage: "Forbidden",
      });
    // go to next middleWare :
    req.userId = decoded.UserInfo.id;

    if (req.userId === ADMIN_ROLE_ID) {
      req.userRole = "admin";
    } else req.userRole = "user";//craftsman
    next();
  });
};

module.exports = verifyJwt;
