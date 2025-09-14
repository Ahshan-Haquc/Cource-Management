// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

function Home() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    // Fetch all courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/courses/displayAllCourseToUser", {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setCourses(res.data.courses);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // Purchase course
    const handlePurchase = async (id) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/courses/purchaseCourse/${id}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                alert("Course purchased successfully!");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Purchase failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[#222831] p-8">
            <h2 className="text-4xl text-white sm:text-5xl font-extrabold text-center mb-16 tracking-tight drop-shadow-lg">
                Available <span className="text-[#76ABAE]">Courses</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div
                            key={course._id}
                            className="relative bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-2xl overflow-hidden border border-gray-700 hover:border-[#76ABAE] transition-all duration-500 transform hover:scale-105 group"
                        >
                            {/* Animated Background Element */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="flex justify-between">
                                        <div className="w-[150px] h-[150px] mb-10">
                                            <img src="https://res.cloudinary.com/dxrvqdrn2/image/upload/v1757872744/blended-learning_lib5zw.png" alt="" />
                                        </div>
                                        <div className="h-fit flex items-center gap-1 text-sm bg-gray-700/50 px-3 py-1 rounded-full">
                                            <span className="text-[#76ABAE] text-xl font-bold">5</span> <Star className="text-[#76ABAE]" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold tracking-tight text-[#EEEEEE] mb-2 group-hover:text-[#76ABAE] transition-colors duration-300">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-300 mb-4 leading-relaxed">
                                        {course.description?.substring(0, 100)}...
                                    </p>
                                    <div className="flex items-center justify-between mb-6">
                                        <p className="font-bold text-3xl text-[#76ABAE] flex items-center gap-1">
                                            {course.price}
                                            <span className="text-sm font-normal text-gray-500">tk</span>
                                        </p>
                                        <div className="text-xs font-light text-gray-400 px-3 py-1 bg-gray-700 rounded-full">
                                            Available
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons Container */}
                                <div className="absolute bottom-0 left-0 w-full bg-[#76ABAE] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-full group-hover:translate-y-0 flex justify-evenly items-center p-3">
                                    <button
                                        onClick={() => navigate(`/course/${course._id}`)}
                                        className="text-[#222831] font-semibold px-4 py-2 rounded-md hover:bg-[#5e8f91] transition-colors duration-300 flex items-center gap-2"
                                        aria-label="View Course"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleAddToWishlist(course._id)}
                                        className="text-[#222831] font-semibold p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                                        aria-label="Add to Wishlist"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 1.03-4.5 2-1.5-1-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(course._id)}
                                        className="text-[#222831] font-semibold p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                                        aria-label="Add to Cart"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                                            <circle cx="8" cy="21" r="1" />
                                            <circle cx="19" cy="21" r="1" />
                                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-[#EEEEEE] text-center col-span-full">
                        No courses available yet. Wait for admin to add some. Please check back later!
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
