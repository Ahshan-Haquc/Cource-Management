const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Our user",
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    tokens: [
      {
        token: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// generating JWT token for this user who is doing signup
UserSchema.methods.generateToken = async function () {
  try {
    const userToken = jwt.sign(
      {
        _id: this._id.toString(),
        email: this.email
      },
      process.env.JWT_SECRET_KEY || "ahsan-course-management-app",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );
    console.log("User token is : ",userToken);

    this.tokens.push({ token: userToken });
    await this.save();

    return userToken;
  } catch (error) {
    console.error("error in token generation:", error);
    throw new Error("Failed to signup, Try again.");
  }
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;