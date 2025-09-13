// src/components/Landing/WhyChooseUs.jsx
import React from "react";
import { BookOpen, Users, Award, Clock } from "lucide-react";

function WhyChooseUs() {
    const reasons = [
        {
            icon: <BookOpen size={40} className="text-[#76ABAE]" />,
            title: "Expert Instructors",
            desc: "Learn from industry experts with years of experience.",
        },
        {
            icon: <Users size={40} className="text-[#76ABAE]" />,
            title: "Community Support",
            desc: "Join a thriving community of learners and mentors.",
        },
        {
            icon: <Award size={40} className="text-[#76ABAE]" />,
            title: "Certified Courses",
            desc: "Get recognized certificates to boost your career.",
        },
        {
            icon: <Clock size={40} className="text-[#76ABAE]" />,
            title: "Flexible Learning",
            desc: "Learn anytime, anywhere at your own pace.",
        },
    ];

    return (
        <section className="bg-gradient-to-br from-[#31363F] to-[#222831] text-[#EEEEEE] py-20 px-6 sm:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 tracking-tight drop-shadow-lg">
                    Why <span className="text-[#76ABAE]">Choose Us?</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center p-8 rounded-2xl bg-[#222831] shadow-2xl border-2 border-transparent hover:border-[#76ABAE] transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
                        >
                            {/* Decorative line on hover */}
                            <div className="absolute top-0 left-0 h-1 w-full bg-[#76ABAE] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

                            <div className="relative mb-5 p-4 rounded-full bg-[#31363F] transition-colors duration-300 group-hover:bg-[#76ABAE] group-hover:shadow-lg">
                                {React.cloneElement(reason.icon, {
                                    className: "text-[#76ABAE] group-hover:text-[#222831] transition-colors duration-300",
                                })}
                            </div>

                            <h3 className="text-2xl font-bold mb-2 text-center text-[#EEEEEE] drop-shadow-sm">
                                {reason.title}
                            </h3>
                            <p className="text-gray-300 text-center text-sm leading-relaxed">
                                {reason.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;