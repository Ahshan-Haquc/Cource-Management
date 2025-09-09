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

    if (!course) {
        return (
            <div className="min-h-screen bg-[#222831] flex items-center justify-center text-[#EEEEEE]">
                Loading course details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#222831] p-8 flex justify-center">
            <div className="bg-[#31363F] text-[#EEEEEE] p-8 rounded-xl shadow-xl max-w-2xl w-full">
                <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                <p className="text-lg mb-4">{course.description}</p>
                <p className="font-semibold mb-2">
                    <span className="text-[#76ABAE]">Instructor:</span> {course.instructor}
                </p>
                <p className="font-semibold mb-4">
                    <span className="text-[#76ABAE]">Price:</span> ${course.price}
                </p>
                <button
                    className="bg-[#76ABAE] text-[#222831] px-6 py-2 rounded hover:bg-[#5e8f91] transition"
                >
                    Purchase
                </button>
            </div>
        </div>
    );
}

export default CourseDetails;
