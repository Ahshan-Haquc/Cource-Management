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
    showAllCartCourseWhenUserNotLogedIn,
    mergeGuestCart,
    addToWishList,
    showAllWishListCourse,
    searchForCourse
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
courseRouter.get('/search', searchForCourse);

courseRouter.get('/addToCart/:courseId',authenticateUserAccess, addToCart)
courseRouter.get('/removeFromCart/:courseId',authenticateUserAccess, removeFromCart)
courseRouter.get('/cart',authenticateUserAccess, showAllCartCourse)
courseRouter.post('/cart/guest', showAllCartCourseWhenUserNotLogedIn) // this route is for guest user means user not loged in
courseRouter.post('/cart/merge',authenticateUserAccess, mergeGuestCart) 

courseRouter.get('/addToWishList/:courseId',authenticateUserAccess, addToWishList); // if course is exist in users wishlist then by the same router course will remove means toggle
courseRouter.get('/showAllWishListCourse',authenticateUserAccess, showAllWishListCourse)

//admin course routers
courseRouter.get('/displayAllCourseToAdmin',authenticateUserAccess, displayAllCourseToUser);
courseRouter.post('/addNewCourse', authenticateUserAccess, addNewCourse)
courseRouter.patch('/editCourseInfo/:id',authenticateUserAccess, editCourseInfo)
courseRouter.delete('/deleteCourse/:id',authenticateUserAccess, deleteCourse)

module.exports = courseRouter;