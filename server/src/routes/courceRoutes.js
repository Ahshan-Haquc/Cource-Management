const express = require('express')
const {displayAllCourseToUser, displayOneCourseToUser} = require('../controllers/userCourseController')
const {addNewCourse, deleteCourse} = require('../controllers/adminCourseController')
const authenticateUserAccess = require('../middlewares/accessPermission')

const courseRouter = express.Router()

// user course routers
courseRouter.get('/displayAllCourseToUser', displayAllCourseToUser);
courseRouter.get('/displayOneCourseToUser/:id', displayOneCourseToUser);

//admin course routers
courseRouter.post('/addNewCourse',addNewCourse)
courseRouter.delete('/deleteCourse/:id', deleteCourse)
courseRouter.get('/displayAllCourseToAdmin', displayAllCourseToUser);

module.exports = courseRouter;