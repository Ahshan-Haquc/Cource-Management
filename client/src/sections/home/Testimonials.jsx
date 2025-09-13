// src/components/Landing/Testimonials.jsx
import React from "react";
import { Star } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,          // transition speed (ms)
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,       // enable auto scrolling
        autoplaySpeed: 3000,  // delay between scrolls (ms)
        cssEase: "linear",    // smooth sliding effect
        pauseOnHover: true,   // pause when user hovers
        responsive: [
            {
                breakpoint: 1024, // for tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // for mobile
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const testimonials = [
        {
            name: "Ariana Smith",
            role: "Software Engineer",
            review:
                "This platform helped me land my first job as a developer! The courses are structured and easy to follow.",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
            name: "Michael Lee",
            role: "UI/UX Designer",
            review:
                "I loved the UI/UX design course! It gave me the confidence to start freelancing.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Sophia Patel",
            role: "Data Scientist",
            review:
                "The Data Science course was amazing. Real-world projects made learning practical and fun.",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Ahshanul Haquc",
            role: "Backend Web Developer",
            review:
                "I loved the Node.js course! It gave me the confidence to start freelancing.",
            image: "https://randomuser.me/api/portraits/men/33.jpg",
        },
    ];

    return (
        <section className="bg-gradient-to-br from-[#222831] to-[#31363F] text-[#EEEEEE] py-20 px-6 sm:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 tracking-tight drop-shadow-lg">
                    What Our <span className="text-[#76ABAE]">Students Say</span>
                </h2>
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-[#31363F] p-8 mr-6 min-h-[400px] rounded-2xl shadow-xl border-2 border-transparent hover:border-[#76ABAE] transition-all duration-300 transform  relative"
                        >
                            <div className="flex justify-center mb-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-[#76ABAE] shadow-md"
                                />
                            </div>
                            <p className="italic text-gray-300 mb-6 text-center text-lg leading-relaxed">
                                “{testimonial.review}”
                            </p>
                            <div className="flex items-center justify-center mb-2 text-[#FFD700]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                                <p className="text-sm text-[#76ABAE] mt-1">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default Testimonials;
