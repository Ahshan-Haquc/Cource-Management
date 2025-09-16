const express = require('express')
const {
    displayAllCourseToUser, 
    displayOneCourseToUser, 
    purchaseCourse, 
    seeUserPurchasedCourses, 
    deleteUserPurchasedCourse,
    addToCart,
    removeFromCart,
    showAllCartCourse,
    addToWishList,
    showAllWishListCourse
} = require('../controllers/userCourseController')
const {addNewCourse, deleteCourse, editCourseInfo} = require('../controllers/adminCourseController')
const authenticateUserAccess = require('../middlewares/accessPermission') // i am adding this 'authenticateUserAccess' so that i can prevent unauthorize user access

const courseRouter = express.Router()

// user course routers
courseRouter.get('/displayAllCourseToUser', displayAllCourseToUser);
courseRouter.get('/displayOneCourseToUser/:id', displayOneCourseToUser);
courseRouter.get('/purchaseCourse/:id', authenticateUserAccess, purchaseCourse);
courseRouter.get('/seeUserPurchasedCourses', authenticateUserAccess, seeUserPurchasedCourses);
courseRouter.delete('/deleteUserPurchasedCourse/:courseId', authenticateUserAccess, deleteUserPurchasedCourse);

courseRouter.post('/addToCart/:courseId',authenticateUserAccess, addToCart)
courseRouter.post('/removeFromCart/:courseId',authenticateUserAccess, removeFromCart)
courseRouter.get('/showAllCartCourse',authenticateUserAccess, showAllCartCourse)
courseRouter.post('/addToWishList/:courseId',authenticateUserAccess, addToWishList); // if course is exist in users wishlist then by the same router course will remove means toggle
courseRouter.get('/showAllWishListCourse',authenticateUserAccess, showAllWishListCourse)

//admin course routers
courseRouter.get('/displayAllCourseToAdmin',authenticateUserAccess, displayAllCourseToUser);
courseRouter.post('/addNewCourse', authenticateUserAccess, addNewCourse)
courseRouter.patch('/editCourseInfo/:id',authenticateUserAccess, editCourseInfo)
courseRouter.delete('/deleteCourse/:id',authenticateUserAccess, deleteCourse)

module.exports = courseRouter;