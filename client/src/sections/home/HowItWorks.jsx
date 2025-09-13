// src/components/Landing/HowItWorks.jsx
import React from "react";
import { Search, PlayCircle, GraduationCap, ChevronRight } from "lucide-react";

function HowItWorks() {
    const steps = [
        {
            icon: <Search size={32} className="text-[#76ABAE]" />,
            title: "Browse Courses",
            desc: "Explore our wide range of professional courses.",
        },
        {
            icon: <PlayCircle size={32} className="text-[#76ABAE]" />,
            title: "Start Learning",
            desc: "Enroll and access video lessons and projects.",
        },
        {
            icon: <GraduationCap size={32} className="text-[#76ABAE]" />,
            title: "Get Certified",
            desc: "Complete the course and earn a certificate.",
        },
    ];

    return (
        <section className="bg-[#31363F] text-[#EEEEEE] py-20 px-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 tracking-tight drop-shadow-lg">
                How It <span className="text-[#76ABAE]">Works</span>
            </h2>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-[#222831] border-2 border-[#76ABAE] mb-4 shadow-xl">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                            <p className="text-gray-300 text-sm max-w-[200px]">{step.desc}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="text-[#76ABAE] my-4 md:my-0">
                                <ChevronRight size={32} className="hidden md:block" />
                                <div className="h-8 w-px bg-[#76ABAE] block md:hidden"></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}

export default HowItWorks;