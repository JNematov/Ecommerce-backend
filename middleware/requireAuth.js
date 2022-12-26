const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const requireAuth = async (req, res, next) => {
  //verify autherization from header
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "invalid authorization" });
  }
  //extract token
  const token = authorization.split(" ")[1];

  //try verifiying token
  try {
    const _id = jwt.verify(token, process.env.SECRET)._id; //find user by id from token
    req.user = await User.findOne({ _id }); //set req.user
    console.log(req.user);
    next();
  } catch (error) {
    console.log("error finding user: " + error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
