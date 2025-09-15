const authenticateUserAccess = require('../middlewares/accessPermission');
const express = require('express');
const {
  userLogin,
  userRegister,
  adminRegister,
  userLogout,
  getUser,
  verifyEmail
} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/userRegister', userRegister);
authRouter.post('/adminRegister', adminRegister);
authRouter.post('/userLogin', userLogin);
authRouter.get('/logout', authenticateUserAccess, userLogout);
authRouter.get('/me', authenticateUserAccess, getUser);

// New verify email route
authRouter.get('/verify/:token', verifyEmail);

module.exports = authRouter;
