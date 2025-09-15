// src/components/InstructorSection.jsx
import React from "react";

export default function InstructorSection() {
    return (
        <section className="max-w-7xl mx-auto py-20 px-6 sm:px-10 lg:px-20 text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 tracking-tight">
                Meet Our <span className="text-[#76ABAE]">Instructors</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-[#31363F] rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all text-center">
                    <img
                        src="https://randomuser.me/api/portraits/men/33.jpg"
                        alt="Instructor"
                        className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-[#76ABAE]"
                    />
                    <h3 className="text-xl font-bold mb-1">John Doe</h3>
                    <p className="text-gray-300 mb-2">Web Development Instructor</p>
                    <p className="text-gray-400 text-sm">10+ years of experience building modern web apps.</p>
                </div>
                <div className="bg-[#31363F] rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all text-center">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Instructor"
                        className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-[#76ABAE]"
                    />
                    <h3 className="text-xl font-bold mb-1">Jane Smith</h3>
                    <p className="text-gray-300 mb-2">Machine Learning Instructor</p>
                    <p className="text-gray-400 text-sm">Expert in AI & ML with real-world project experience.</p>
                </div>
                <div className="bg-[#31363F] rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all text-center">
                    <img
                        src="https://randomuser.me/api/portraits/men/45.jpg"
                        alt="Instructor"
                        className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-[#76ABAE]"
                    />
                    <h3 className="text-xl font-bold mb-1">Michael Lee</h3>
                    <p className="text-gray-300 mb-2">Digital Marketing Instructor</p>
                    <p className="text-gray-400 text-sm">Helping students excel in SEO, Social Media & Ads campaigns.</p>
                </div>
            </div>
        </section>
    );
}