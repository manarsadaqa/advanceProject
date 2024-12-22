const verifyAdmin = async (req, res, next) => {
  const isAdmin = req.userRole === "admin";
  if (!isAdmin) {
    return res.status(401).json({
      massage: "Unauthorized", // you are not allowed to go there
    });
  }
  console.log("admin login !");
  next();
};
module.exports = { verifyAdmin };
