const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

// This function can have any name because ,
// the auth.js just imports("requires") the function ,which is exported(module.exports) from here

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY); //it gets the entire data of the user with this token

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) { throw new Error("User not found") }

    req.token=token;
    req.rootUser=rootUser;
    req.userID=rootUser._id;

    next();

  } catch (err) {
    res.status(401).send("Unauthorised:No token provided");
    console.log(err);
  }
};

module.exports = Authenticate;
