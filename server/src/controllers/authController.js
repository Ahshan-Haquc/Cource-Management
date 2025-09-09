const UserModel = require('../models/userSchema')
const bcrypt = require('bcrypt')

const userRegister = async (req, res)=>{
    console.log("Request recieved for signup.")
    try {
        const {name, email, password} = req.body;

        //validating inputs
        if(!name || !email || !password){
            res.status(400);
            throw new Error("Name, Email and password are required");
        }
        //checking email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400);
            throw new Error("Invalid email format");
        }
        // checking password length
        if(password.length < 6){
            res.status(400);
            throw new Error("Password length must be greater than 6");
        } 

        //checking if any user registerd with this email then i will not do him signup
        const isUserExist = await UserModel.findOne({email});
        if(isUserExist){
            res.status(400);
            throw new Error("Please try with another email and password.");
        }

        //encrypting the password
        const encryptedPassword = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            name,
            email,
            password: encryptedPassword
        })
        await newUser.save();

        res.status(200).json({success: true, message:"User registered succesfully."})
    } catch (error) {
        res.status(500);
        throw new Error("Server error during signup. Try later.");
    }
};

const adminRegister = async (req,res)=>{
    try {
        const {email} = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        const role="admin";

    if(!email || !password){
        res.status(400);
        throw new Error("Email and password are required");
    }
    //checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400);
        throw new Error("Invalid email format");
    }
    const user = await UserModel.findOne({email});
    if(user){
        res.status(400).json({success:false, message:"Try with another email account. Admit already exist with this email"});
    }else{
        const Admin = new UserModel({
            email, password, role
        })
        const data= await Admin.save();
        res.status(201).json({success:true, message:"Admin created succesfully"});
    }
    } catch (error) {
        res.status(500)
        throw new Error("Server error during admin registration.")
    }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    //checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400);
        throw new Error("Invalid email format");
    }

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Generateing JWT token
    const token = await user.generateToken();

    // Setting token in HTTP-only cookie , duration is 1h
    res.cookie("userCookie", token, {
      httpOnly: true,
      secure: false, 
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    // Final response with role
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      },
    });
    } catch (err) {
        res.status(500);
        throw new Error("Server error during login");
    }
};

const userLogout = async (req, res) => {
  console.log("Request recieved for logout.");
  try {
    console.log(req.userInfo._id);
    const user = await UserModel.findOne({ _id: req.userInfo._id });

    if(!user) return res.status(401).json({success: false, message: "Please become valid user first."})

    if (user) {
      user.tokens = [];
      await user.save();
    }

    res.clearCookie("userCookie", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500)
    throw new Error(error);
  }
};

module.exports={
    userLogin,
    userRegister,
    adminRegister,
    userLogout
}