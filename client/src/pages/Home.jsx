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
                                    onClick={() => navigate(`/course/${course._id}`)}
                                    className="bg-[#76ABAE] text-[#222831] px-4 py-2 rounded hover:bg-[#5e8f91] transition"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handlePurchase(course._id)}
                                    className="bg-[#EEEEEE] text-[#222831] px-4 py-2 rounded hover:bg-gray-300 transition"
                                >
                                    Purchase
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-[#EEEEEE] text-center col-span-3">
                        No courses available yet.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
