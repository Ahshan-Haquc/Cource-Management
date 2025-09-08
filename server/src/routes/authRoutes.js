const express = require('express')
const {userLogin, userRegister} = require('../controllers/authController')
const authRouter = express.Router()

authRouter.post('/userLogin',userLogin);
authRouter.post('/userRegister',userRegister);

module.exports = authRouter;