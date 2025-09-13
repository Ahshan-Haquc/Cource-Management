// src/components/Landing/FeaturedCourses.jsx
import React from "react";
import { Link } from "react-router-dom";

function FeaturedCourses() {
    const courses = [
        {
            id: 1,
            title: "Full-Stack Web Development",
            description:
                "Learn MERN stack (MongoDB, Express, React, Node) and build real-world applications.",
            price: 49,
        },
        {
            id: 2,
            title: "UI/UX Design Fundamentals",
            description:
                "Master the basics of UI/UX design, wireframing, and prototyping with Figma.",
            price: 39,
        },
        {
            id: 3,
            title: "Data Science with Python",
            description:
                "Explore data analysis, machine learning, and visualization using Python libraries.",
            price: 59,
        },
    ];

    return (
        <section className="bg-[#222831] text-[#EEEEEE] py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-[#31363F] p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
                    >
                        <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                        <p className="text-gray-300 mb-4">{course.description}</p>
                        <p className="text-[#76ABAE] font-semibold mb-4">
                            Price: ${course.price}
                        </p>
                        <div className="flex justify-between">
                            <Link
                                to={`/courses/${course.id}`}
                                className="bg-[#76ABAE] text-[#222831] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                View
                            </Link>
                            <button className="bg-[#222831] border border-[#76ABAE] text-[#EEEEEE] px-4 py-2 rounded-lg font-semibold hover:bg-[#76ABAE] hover:text-[#222831] transition">
                                Purchase
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedCourses;
