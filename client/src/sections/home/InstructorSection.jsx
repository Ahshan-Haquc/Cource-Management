// src/components/InstructorSection.jsx
import React from "react";

const instructors = [
    {
        name: "Dr. Sarah Johnson",
        title: "Data Science Expert",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Michael Smith",
        title: "Full Stack Developer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Emily Davis",
        title: "AI & Machine Learning Specialist",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        name: "James Wilson",
        title: "Cybersecurity Analyst",
        image: "https://randomuser.me/api/portraits/men/56.jpg",
    },
];

export default function InstructorSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-[#222831] to-[#31363F] text-[#EEEEEE]">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 tracking-tight drop-shadow-lg">
                    Meet Our <span className="text-[#76ABAE]">Instructors</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {instructors.map((instructor, index) => (
                        <div
                            key={index}
                            className="bg-[#31363F] rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-[#383d47]"
                        >
                            <img
                                src={instructor.image}
                                alt={instructor.name}
                                className="w-full h-56 object-cover border-b-4 border-[#76ABAE]"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-[#76ABAE] mb-1">
                                    {instructor.name}
                                </h3>
                                <p className="text-sm text-gray-400">{instructor.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}