// src/pages/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/courses/displayOneCourseToUser/${id}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    setCourse(res.data.courses[0]);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };
        fetchCourse();
    }, [id]);

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

    if (!course) {
        return (
            <div className="min-h-screen bg-[#222831] flex items-center justify-center text-[#EEEEEE]">
                Loading course details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#31363F] to-[#222831] p-8 flex justify-center items-center">
            <div className="bg-[#31363F] text-[#EEEEEE] p-10 rounded-2xl shadow-2xl max-w-2xl w-full relative">
                <div className="absolute top-6 right-6 bg-[#76ABAE] text-[#222831] px-4 py-1 rounded-full font-semibold text-sm shadow">
                    ${course.price}
                </div>
                <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{course.title}</h2>
                <p className="text-base mb-6 text-[#bfcad6]">{course.description}</p>
                <div className="flex items-center gap-3 mb-6">
                    <span className="inline-block bg-[#76ABAE] text-[#222831] px-3 py-1 rounded-full text-sm font-medium">
                        Instructor
                    </span>
                    <span className="font-semibold">{course.instructor}</span>
                </div>
                <button
                    className="w-full bg-[#76ABAE] text-[#222831] px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#5e8f91] transition duration-200 shadow-lg mt-2"
                    onClick={() => handlePurchase(course._id)}
                >
                    Purchase Course
                </button>
            </div>
        </div>
    );
}

export default CourseDetails;
