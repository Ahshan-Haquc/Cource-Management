// src/components/Landing/WhyChooseUs.jsx
import React from "react";
import { BookOpen, Users, Award, Clock, Cpu, Book } from "lucide-react";

function WhyChooseUs() {

    return (
        <section className="max-w-7xl mx-auto py-20 px-6 sm:px-10 lg:px-20 text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 tracking-tight">
                Why <span className="text-[#76ABAE]">Choose Us</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-10 text-center">
                <div className="bg-[#31363F] p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all">
                    <Cpu size={40} className="mx-auto text-[#76ABAE] mb-4" />
                    <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
                    <p className="text-gray-300">
                        Learn from experienced instructors who are industry professionals.
                    </p>
                </div>
                <div className="bg-[#31363F] p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all">
                    <Book size={40} className="mx-auto text-[#76ABAE] mb-4" />
                    <h3 className="text-xl font-bold mb-2">Practical Courses</h3>
                    <p className="text-gray-300">
                        Courses include hands-on projects to make learning practical and engaging.
                    </p>
                </div>
                <div className="bg-[#31363F] p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all">
                    <Users size={40} className="mx-auto text-[#76ABAE] mb-4" />
                    <h3 className="text-xl font-bold mb-2">Community Support</h3>
                    <p className="text-gray-300">
                        Join a community of learners and get support from peers and mentors.
                    </p>
                </div>
                <div className="bg-[#31363F] p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all">
                    <Award size={40} className="mx-auto text-[#76ABAE] mb-4" />
                    <h3 className="text-xl font-bold mb-2">Certifications</h3>
                    <p className="text-gray-300">
                        Earn certificates for completed courses to showcase your skills.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;