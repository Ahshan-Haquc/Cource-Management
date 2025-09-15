const CourseModel = require('../models/courceSchema')

const addNewCourse = async (req, res) => {
    console.log("Request received for adding new course");
    try {
        // Only Admin Can Add
        if (req.userInfo.role !== "admin") {
            return res
                .status(403)
                .json({ success: false, message: "Only admin can add new course. You cannot." });
        }

        const {
            title,
            description,
            category,
            price,
            thumbnail,
            instructor,
            lessons,
            objectives,
            prerequisites,
            targetAudience,
            faqs
        } = req.body;

        console.log("w1")
        // Basic Validation
        if (!title || !price || !category || !instructor?.name) {
            return res.status(400).json({
                success: false,
                message: "Title, Price, Category, and Instructor name are required."
            });
        }
        console.log("w2")
        // Create New Course
        const newCourse = new CourseModel({
            title,
            description,
            category,
            price,
            thumbnail,
            instructor,
            lessons,
            objectives,
            prerequisites,
            targetAudience,
            faqs
        });

        console.log("w3")
        await newCourse.save();
        res.status(201).json({ success: true, message: "Course added successfully.", course: newCourse });
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while adding new course."
        });
    }
};

// sir, this is an extra feature which i am including to make my project more professional
// because sometimes i need to update any info of courses
const editCourseInfo = async (req, res) => {
    console.log("Request received for editing a course info");
    try {
        //checking if role is not user then i will not allow them to add new course
        if(req.userInfo.role!=="admin"){
            return res.status(400).json({success: false, message:"Only admin can add new course. You can not."})
        }

        const { id } = req.params;
        const newInfo = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Course ID is required." });
        }else if(!newInfo){
            return res.status(400).json({ success: false, message: "Input required." });
        }

        const editedCourse = await CourseModel.findByIdAndUpdate(id,
            {$set: newInfo},
            { new: true, runValidators: true }
        );
        if (!editedCourse) {
            return res.status(404).json({ success: false, message: "Course not found." });
        }

        res.status(200).json({ success: true, message: "Course updated successfully." });
    } catch (error) {
        res.status(500);
        throw new Error("Internal server error while deleting course.");
    }
}

const deleteCourse = async (req, res) => {
    console.log("Request received for deleting a course");
    try {
        //checking if role is not user then i will not allow them to add new course
        if(req.userInfo.role!=="admin"){
            return res.status(400).json({success: false, message:"Only admin can add new course. You can not."})
        }
        
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Course ID is required." });
        }

        const deletedCourse = await CourseModel.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: "Course not found." });
        }

        res.status(200).json({ success: true, message: "Course deleted successfully." });
    } catch (error) {
        res.status(500);
        throw new Error("Internal server error while deleting course.");
    }
}

module.exports = {
    addNewCourse,
    editCourseInfo,
    deleteCourse
}