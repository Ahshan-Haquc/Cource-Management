// src/pages/AdminHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminHome() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    // Fetch all courses for admin
    const fetchCourses = async () => {
        try {
            const res = await axios.get(
                "https://cource-management-backend.vercel.app/api/admin/courses/displayAllCourseToAdmin",
                { withCredentials: true }
            );
            if (res.data.success) {
                setCourses(res.data.courses);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Delete course
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            const res = await axios.delete(
                `https://cource-management-backend.vercel.app/api/admin/courses/deleteCourse/${id}`,
                { withCredentials: true }
            );
            if (res.data.success) {
                alert("Course deleted successfully!");
                fetchCourses();
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Delete failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[#222831] p-8">
            {/* Add Course Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => navigate("/admin/add-course")}
                    className="w-full sm:w-auto flex-1 border-2 border-[#76ABAE] text-[#76ABAE] px-4 py-2 rounded font-semibold hover:bg-[#76ABAE] hover:text-[#222831] transition-colors duration-300"

                >
                    + Add New Course
                </button>
            </div>

            {/* Courses List */}
            <h2 className="text-3xl font-bold text-center text-[#EEEEEE] mb-8">
                Manage Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div
                            key={course._id}
                            className="relative bg-[#31363F] text-[#EEEEEE] p-6 rounded-lg border border-transparent hover:border-[#76ABAE] transition-all duration-300 transform hover:scale-105 group"
                        >
                            {/* Decorative flair */}
                            <div className="absolute top-0 left-0 w-0 h-2 bg-[#76ABAE] group-hover:w-full transition-all duration-500"></div>
                            <div className="absolute bottom-0 right-0 w-0 h-2 bg-[#76ABAE] group-hover:w-full transition-all duration-500"></div>

                            <h3 className="text-xl md:text-2xl font-extrabold mb-2 tracking-wide text-[#EEEEEE]">
                                {course.title}
                            </h3>

                            <p className="mb-3 text-sm text-gray-300">
                                {course.description?.substring(0, 80)}...
                            </p>

                            <div className="flex items-center justify-between mt-4 mb-6">
                                <p className="font-bold text-xl text-[#76ABAE] flex items-center gap-1">
                                    {course.price}
                                </p>
                                {/* A subtle indicator to make it feel more "techy" */}
                                <div className="text-sm font-light text-gray-400 px-3 py-1 bg-gray-700 rounded-full">
                                    Admin
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between gap-3">
                                <button
                                    onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                                    className="w-full sm:w-auto flex-1 border-2 border-[#76ABAE] text-[#76ABAE] px-4 py-2 rounded font-semibold hover:bg-[#76ABAE] hover:text-[#222831] transition-colors duration-300"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="w-full sm:w-auto flex-1 bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition-colors duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-[#EEEEEE] text-center col-span-3">
                        No courses available.
                    </p>
                )}
            </div>
        </div>
    );
}

export default AdminHome;
