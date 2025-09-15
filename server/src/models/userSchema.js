const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["user", "admin", "instructor"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "https://i.ibb.co/2n4H4jv/default-avatar.png",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    tokens: [
      {
        token: { type: String, required: true },
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