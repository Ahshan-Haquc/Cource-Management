const jwt = require('jsonwebtoken');
const UserModel = require('../models/userSchema');

const accessPermission = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.userCookie;

    if (!cookieToken) {
      return res.status(401).json({ success: false, message: "Without login you can not access. Please login first." });
    }

    const validUser = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findOne({ _id: validUser._id });

    if (!user) {
      return res.status(401).json({ success: false, message: "Without login you can not access. Please login first." });
    }

    req.token = cookieToken;
    req.userInfo = user;
    next();
  } catch (error) {
    req.unAuthenticateUser = true;
    return res.status(401).json({ success: false, message: "Without login you can not access. Please login first." });
  }
};

module.exports = accessPermission;