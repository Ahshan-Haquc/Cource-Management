// src/pages/About.jsx
import React from "react";
import { Cpu, Users, Book, Award } from "lucide-react";
import WhyChooseUs from "../sections/home/WhyChooseUs";
import InstructorSection from "../sections/home/InstructorSection";

function About() {
    return (
        <div className="bg-[#222831] text-[#EEEEEE] min-h-screen">
            {/* Header */}
            <header className="py-16 text-center px-6 sm:px-10 lg:px-20">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#76ABAE] mb-4">
                    About ByteAcademy
                </h1>
                <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
                    Empowering students and professionals to master computer science skills and launch their careers in tech.
                </p>
            </header>

            {/* Mission & Vision */}
            <section className="max-w-7xl mx-auto py-20 px-6 sm:px-10 lg:px-20 grid md:grid-cols-2 gap-16">
                <div className="bg-[#31363F] rounded-2xl p-10 shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all">
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Our mission is to provide high-quality, practical courses in computer science and digital technologies that help students and professionals enhance their skills, build projects, and succeed in their careers.
                    </p>
                </div>
                <div className="bg-[#31363F] rounded-2xl p-10 shadow-lg border-2 border-transparent hover:border-[#76ABAE] transition-all">
                    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                    <p className="text-gray-300 leading-relaxed">
                        To become the most trusted online platform for learning computer science and technology, connecting students with expert instructors and real-world projects that make learning practical and engaging.
                    </p>
                </div>
            </section>

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Instructor Section */}
            <InstructorSection />
        </div>
    );
}

export default About;
