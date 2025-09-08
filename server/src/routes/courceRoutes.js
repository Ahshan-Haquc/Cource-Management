const express = require('express')
const {getCourse} = require('../controllers/courceController')
const authenticateUserAccess = require('../middlewares/accessPermission')

const courseRouter = express.Router()

courseRouter.get('/getCourse',authenticateUserAccess, getCourse);

module.exports = courseRouter;