// src/components/Landing/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section
            className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden py-20"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1580816990425-9c9250f22378?q=80&w=2070&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-[#222831] opacity-90 z-0"></div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-6 max-w-4xl text-[#EEEEEE]">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
                    Stack up your skills like a <span className="text-[#76ABAE]">developer</span>.
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Explore high-quality courses taught by industry experts. Gain new skills and level up your career with lifetime access and dedicated community support.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                        to="/courses"
                        className="bg-[#76ABAE] text-[#222831] px-8 py-4 rounded-lg font-bold hover:bg-[#5e8f91] transition-all duration-300 transform hover:scale-105"
                    >
                        Browse Courses
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-transparent text-[#EEEEEE] border-2 border-[#76ABAE] px-8 py-4 rounded-lg font-bold hover:bg-[#76ABAE] hover:text-[#222831] transition-all duration-300 transform hover:scale-105"
                    >
                        Join Now
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;