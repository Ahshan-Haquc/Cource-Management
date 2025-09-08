const CourseModel = require('../models/courceSchema')

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

module.exports={
    displayAllCourseToUser,
    displayOneCourseToUser
}