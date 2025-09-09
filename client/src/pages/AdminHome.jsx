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
                "http://localhost:5000/api/admin/courses/displayAllCourseToAdmin",
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
                `http://localhost:5000/api/admin/courses/deleteCourse/${id}`,
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
                    className="bg-[#76ABAE] text-[#222831] px-6 py-2 rounded hover:bg-[#5e8f91] transition"
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
                            className="bg-[#31363F] text-[#EEEEEE] p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                            <p className="mb-3 text-sm text-gray-300">
                                {course.description?.substring(0, 80)}...
                            </p>
                            <p className="font-semibold text-[#76ABAE] mb-4">
                                Price: ${course.price}
                            </p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                                    className="bg-[#76ABAE] text-[#222831] px-4 py-2 rounded hover:bg-[#5e8f91] transition"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
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
