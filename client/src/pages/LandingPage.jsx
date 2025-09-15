// src/pages/LandingPage.jsx
import React from "react";
import HeroSection from '../sections/home/HeroSection'
import SearchBarCategories from '../sections/home/SearchBarCategories'
import FeaturedCourses from '../sections/home/FeaturedCourses'
import WhyChooseUs from '../sections/home/WhyChooseUs'
import Testimonials from '../sections/home/Testimonials'
import HowItWorks from '../sections/home/HowItWorks'
import InstructorSection from '../sections/home/InstructorSection'
import CTASection from '../sections/home/CTASection'
import Courses from './Courses'


export default function LandingPage() {
    return (
        <>
            {/* 1. Hero */}
            <HeroSection />

            {/* 2. Search & Categories */}
            <SearchBarCategories />

            {/* 3. Featured Courses */}
            <Courses />

            {/* 4. Why Choose Us */}
            <WhyChooseUs />

            {/* 5. Testimonials */}
            <Testimonials />

            {/* 6. How It Works */}
            <HowItWorks />

            {/* 7. Instructor Section */}
            <InstructorSection />

            {/* 8. Call-to-Action */}
            <CTASection />
        </>
    );
}
