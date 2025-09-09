// src/pages/PurchasedCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function PurchasedCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch purchased courses
    useEffect(() => {
        const fetchPurchasedCourses = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/courses/seeUserPurchasedCourses",
                    { withCredentials: true }
                );
                console.log("Purchased courses response:", res.data);
                if (res.data.success) {
                    setCourses(res.data.courses);
                } else {
                    console.log("Failed to fetch purchased courses");
                    console.log(res.data.message);
                    alert(res.data.message);
                }
            } catch (error) {
                console.error("Error fetching purchased courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchasedCourses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#222831] flex items-center justify-center text-[#EEEEEE]">
                Loading your purchased courses...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#222831] to-[#31363F] p-8">
            <h2 className="text-4xl font-extrabold text-center text-[#76ABAE] mb-10 drop-shadow-lg">
                My Purchased Courses
            </h2>

            {courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-[#31363F] text-[#EEEEEE] p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-[#EEEEEE]">
                                    {course.title}
                                </h3>
                                <p className="mb-4 text-base text-gray-300">
                                    {course.description?.substring(0, 100)}...
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-4 text-[#76ABAE]">
                                <p className="font-bold text-xl text-[#76ABAE] flex items-center gap-1">
                                    {course.price}
                                    <span className="text-sm font-normal text-gray-400">tk</span>
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-20">
                    <svg
                        className="w-16 h-16 mb-6 text-[#76ABAE]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-center text-lg text-[#EEEEEE]">
                        You haven’t purchased any courses yet.<br />
                        Start exploring and unlock your learning journey!
                    </p>
                </div>
            )}
        </div>
    );
}

export default PurchasedCourses;
