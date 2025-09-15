// src/components/CTASection.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
    return (
        <section className="bg-[#76ABAE] text-[#222831] py-20 px-6 text-center rounded-xl mx-6 md:mx-20 my-12">
            <h2 className="text-4xl font-bold mb-6">
                Ready to Start Learning Today?
            </h2>
            <p className="text-lg mb-8">
                Join thousands of learners and gain access to high-quality courses from expert instructors.
            </p>
            <div className="space-x-4">
                <Link
                    to="/signup"
                    className="bg-[#222831] text-[#EEEEEE] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    Join Now
                </Link>
                <Link
                    to="/courses"
                    className="bg-[#222831] text-[#EEEEEE] border border-[#222831] px-6 py-3 rounded-lg font-semibold hover:bg-[#222831] hover:text-[#76ABAE] transition"
                >
                    Browse Courses
                </Link>
            </div>
        </section>
    );
}
