const CourseModel = require('../models/courceSchema')
const PurchaseModel = require('../models/purchesSchema')

const displayAllCourseToUser = async (req, res)=>{
    console.log("Request recieved for display all course to user");
    try {
        const courses = await CourseModel.find();
        res.status(200).json({
            success: true,
            courses,
            message: "Courses fetched succesfully."
        })
    } catch (error) {
        res.status(500)
        throw new Error("Server error during showing all courses to user.")
    }
}

const displayOneCourseToUser = async (req, res)=>{
    console.log("Request recieved for display one specific course to user");
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Course ID is required." });
        }

        const courses = await CourseModel.find({_id:id});
        res.status(200).json({
            success: true,
            courses,
            message: "This specific course fetched succesfully."
        })
    } catch (error) {
        res.status(500)
        throw new Error("Server error during showing all courses to user.")
    }
}

const purchaseCourse = async (req, res)=>{
    console.log("Request recieved for purchase specific course to user");
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Course ID is required." });
        }

        const course = await CourseModel.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found." });
        }

        const userId = req.userInfo._id;
        const userPurchaseCollection = await PurchaseModel.findOne({ user: userId });
        if (userPurchaseCollection) {
            if (userPurchaseCollection.courses.includes(id)) {
                return res.status(400).json({ success: false, message: "Course already purchased." });
            }
            userPurchaseCollection.courses.push(id);
            await userPurchaseCollection.save();
        } else {
            const newPurchase = new PurchaseModel({
                user: userId,
                courses: [id]
            });
            await newPurchase.save();
        }

        res.status(200).json({ success: true, message: "Course purchased successfully." });
    } catch (error) {
        res.status(500);
        throw new Error("Server error during course purchase.");
    }
}

const seeUserPurchasedCourses = async (req, res) => {
    console.log("Request received to see user's purchased courses");
    try {
        const userId = req.userInfo._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Please login first" });
        }

        const userPurchases = await PurchaseModel.findOne({ user: userId });
        if (!userPurchases) {
            return res.status(404).json({ success: false, message: "No purchased courses found." });
        }

        let courses = [];
        for (const courseId of userPurchases.courses) {
            const course = await CourseModel.findById(courseId);
            if (course) {
                courses.push(course);
            }
        }

        res.status(200).json({
            success: true,
            courses,
            message: "Successfully fetched your purchased courses."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error while fetching user's purchased courses." });
    }
};

const deleteUserPurchasedCourse = async (req, res) => {
    console.log("Request received to delete a purchased course for user");
    try {
        const { courseId } = req.params;
        const userId = req.userInfo._id;

        const userPurchaseCollection = await PurchaseModel.findOne({ user: userId });
        if (!userPurchaseCollection) {
            return res.status(404).json({ success: false, message: "No purchased courses found." });
        }

        userPurchaseCollection.courses = userPurchaseCollection.courses.filter(id => id.toString() !== courseId);
        await userPurchaseCollection.save();

        res.status(200).json({ success: true, message: "Course deleted from purchased courses." });
    } catch (error) {
        res.status(500);
        throw new Error("Server error while deleting user's purchased course.");
    }
}

module.exports={
    displayAllCourseToUser,
    displayOneCourseToUser,
    purchaseCourse,
    seeUserPurchasedCourses,
    deleteUserPurchasedCourse
}