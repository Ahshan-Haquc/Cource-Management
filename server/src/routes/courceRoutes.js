const express = require('express')
const {displayAllCourseToUser, displayOneCourseToUser, purchaseCourse, seeUserPurchasedCourses, deleteUserPurchasedCourse} = require('../controllers/userCourseController')
const {addNewCourse, deleteCourse} = require('../controllers/adminCourseController')
const authenticateUserAccess = require('../middlewares/accessPermission') // i am adding this 'authenticateUserAccess' so that i can prevent unauthorize user access

const courseRouter = express.Router()

// user course routers
courseRouter.get('/displayAllCourseToUser', displayAllCourseToUser);
courseRouter.get('/displayOneCourseToUser/:id', displayOneCourseToUser);
courseRouter.get('/purchaseCourse/:id', authenticateUserAccess, purchaseCourse);
courseRouter.get('/seeUserPurchasedCourses', authenticateUserAccess, seeUserPurchasedCourses);
courseRouter.delete('/deleteUserPurchasedCourse/:courseId', authenticateUserAccess, deleteUserPurchasedCourse);

//admin course routers
courseRouter.post('/addNewCourse',addNewCourse)
courseRouter.delete('/deleteCourse/:id', deleteCourse)
courseRouter.get('/displayAllCourseToAdmin', displayAllCourseToUser);

module.exports = courseRouter;