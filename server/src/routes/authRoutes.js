const authenticateUserAccess = require('../middlewares/accessPermission');
const express = require('express');
const {
  userLogin,
  userRegister,
  adminRegister,
  userLogout,
  getUser,
  verifyEmail,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/userRegister', userRegister);
authRouter.post('/adminRegister', adminRegister);
authRouter.post('/userLogin', userLogin);
authRouter.get('/logout', authenticateUserAccess, userLogout);
authRouter.get('/me', authenticateUserAccess, getUser);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);

// New verify email route
authRouter.get('/verify/:token', verifyEmail);

module.exports = authRouter;
