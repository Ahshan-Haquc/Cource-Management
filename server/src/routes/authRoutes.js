const express = require('express')
const {
    userLogin, 
    userRegister, 
    adminRegister, 
    userLogout
} = require('../controllers/authController')
const authRouter = express.Router()

authRouter.post('/userRegister',userRegister);
authRouter.post('/adminRegister',adminRegister);
authRouter.post('/userLogin',userLogin);
authRouter.post('/userLogout',userLogout);

module.exports = authRouter;