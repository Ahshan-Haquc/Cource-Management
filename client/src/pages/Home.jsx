// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    // Fetch all courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/courses/displayAllCourseToUser", {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setCourses(res.data.courses);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // Purchase course
    const handlePurchase = async (id) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/courses/purchaseCourse/${id}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                alert("Course purchased successfully!");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Purchase failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[#222831] p-8">
            <h2 className="text-3xl font-bold text-center text-[#EEEEEE] mb-8">
                Available Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div
                            key={course._id}
                            className="relative bg-[#31363F] text-[#EEEEEE] p-6 rounded-lg border border-transparent hover:border-[#76ABAE] transition-all duration-300 transform hover:scale-105 group flex flex-col justify-between"
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
                                    <span className="text-sm font-normal text-gray-400">tk</span>
                                </p>
                                {/* A subtle indicator to make it feel more "techy" */}
                                <div className="text-sm font-light text-gray-400 px-3 py-1 bg-gray-700 rounded-full">
                                    Available
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between gap-3">
                                <button
                                    onClick={() => navigate(`/course/${course._id}`)}
                                    className="w-full sm:w-auto flex-1 border-2 border-[#76ABAE] text-[#76ABAE] px-4 py-2 rounded font-semibold hover:bg-[#76ABAE] hover:text-[#222831] transition-colors duration-300"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handlePurchase(course._id)}
                                    className="w-full sm:w-auto flex-1 bg-[#EEEEEE] text-[#222831] px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors duration-300"
                                >
                                    Purchase
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-[#EEEEEE] text-center col-span-3">
                        No courses available yet. Wait for admin to add some. Please check back later!
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
