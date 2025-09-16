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

    const handleAddToCart = async (id) => {
        try {

        } catch (error) {

        }
    }

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
                                <div className="h-16 absolute bottom-0 left-0 w-full bg-[#76ABAE] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl overflow-hidden transform translate-y-full group-hover:translate-y-0 flex justify-evenly items-center">
                                    <button
                                        onClick={() => navigate(`/course/${course._id}`)}
                                        className="h-full w-3/5 text-[#222831] font-semibold px-4 py-2 hover:bg-white/20  transition-colors duration-300 flex items-center justify-center hover:cursor-pointer"
                                        aria-label="View Course"
                                    >

                                        View Course
                                    </button>
                                    <button
                                        onClick={() => handleAddToWishlist(course._id)}
                                        className="h-full w-1/5 text-[#222831] font-semibold p-2 hover:bg-white/20 transition-colors duration-300  flex items-center justify-center hover:cursor-pointer" title="Add to wish-list"
                                        aria-label="Add to Wishlist"
                                    >
                                        <Heart size={22} />
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(course._id)}
                                        className="h-full w-1/5 text-[#222831] font-semibold p-2 hover:bg-white/20 transition-colors duration-300  flex items-center justify-center hover:cursor-pointer" title="Add to cart"
                                        aria-label="Add to Cart"
                                    >
                                        <ShoppingCart size={22} />
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
