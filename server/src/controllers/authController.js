const UserModel = require('../models/userSchema')
const bcrypt = require('bcrypt')

const userRegister = async (req, res)=>{
    console.log("Request recieved for signup.")
    try {
        const {name, email, password} = req.body;

        //validating inputs
        if(!name || !email || !password){
            res.status(400);
            throw new Error("Input required in the field");
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

const userLogin = (req, res)=>{
    res.send("welcome to login page")
}

module.exports={
    userLogin,
    userRegister
}