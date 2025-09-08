const express = require('express')
const {login} = require('../controllers/authController')
const authRouter = express.Router()

authRouter.get('/login',login);

module.exports = authRouter;