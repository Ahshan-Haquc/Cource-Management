const UserModel = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const sendEmailPassRecovery = require('../utils/sendEmailPassRecovery');


const userRegister = async (req, res) => {
  console.log("Request recieved for signup.");
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password length must be greater than 6" });
    }

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Please try with another email and password." });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: encryptedPassword
    });
    await newUser.save();

    // Generate verification token
    const verifyToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    const verifyUrl = `https://cource-management-backend.vercel.app/api/auth/verify/${verifyToken}`;

    // Send email
    await sendEmail(
      newUser.email,
      "Verify your email",
      `<h3>Hello ${newUser.name},</h3>
       <p>Please click the link below to verify your email:</p>
       <a href="${verifyUrl}">Verify Email</a>`
    );

    res.status(200).json({ success: true, message: "Signup successful! Please check your email to verify." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during signup. Try later." });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(400).send("Invalid link");

    user.isVerified = true;
    await user.save();

    res.send("Email verified successfully! Now you can login.");
  } catch (err) {
    res.status(400).send("Invalid or expired token");
  }
};

const adminRegister = async (req, res) => {
  try {
    const { email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const role = "admin";

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "Admin already exists with this email" });
    } else {
      const Admin = new UserModel({ email, password, role });
      await Admin.save();
      res.status(201).json({ success: true, message: "Admin created succesfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during admin registration." });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // check verification
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first." });
    }

    const token = await user.generateToken();

    res.cookie("userCookie", token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { _id: user._id, email: user.email, role: user.role },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
};

const userLogout = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userInfo._id });

    if (!user) return res.status(401).json({ success: false, message: "Invalid user" });

    user.tokens = [];
    await user.save();

    res.clearCookie("userCookie", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.userInfo,
      message: "Fetched user info succesfully."
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found with this email" });

    // create token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY || "reset-secret",
      { expiresIn: "15m" }
    );

    // send reset link
    const resetURL = `https://dev-zone-academy.vercel.app/reset-password/${resetToken}`;
    const message = `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password (valid for 15 minutes):</p>
      <a href="${resetURL}" target="_blank">Reset Password</a>
    `;

    await sendEmailPassRecovery(user.email, "Password Reset", message);

    res.status(200).json({ success: true, message: "Reset link sent to your email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during forgot password" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: "Password is required" });

    // verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "reset-secret");
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during reset password" });
  }
};

module.exports = {
  userLogin,
  userRegister,
  adminRegister,
  userLogout,
  getUser,
  verifyEmail,
  forgotPassword,
  resetPassword
};
