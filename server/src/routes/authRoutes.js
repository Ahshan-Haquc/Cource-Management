const express = require('express')
const {userLogin, userRegister, adminRegister} = require('../controllers/authController')
const authRouter = express.Router()

authRouter.post('/userRegister',userRegister);
authRouter.post('/adminRegister',adminRegister);
authRouter.post('/userLogin',userLogin);

module.exports = authRouter;