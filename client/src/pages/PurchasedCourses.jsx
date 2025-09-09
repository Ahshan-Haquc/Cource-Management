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
                if (res.data.success) {
                    setCourses(res.data.courses);
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
        <div className="min-h-screen bg-[#222831] p-8">
            <h2 className="text-3xl font-bold text-center text-[#EEEEEE] mb-8">
                My Purchased Courses
            </h2>

            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
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
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-[#EEEEEE]">
                    You haven’t purchased any courses yet.
                </p>
            )}
        </div>
    );
}

export default PurchasedCourses;
