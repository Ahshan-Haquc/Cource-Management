// src/pages/WishListPage.jsx
import React, { useEffect } from "react";
import { useWishList } from "../context/WishListContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";

function WishListPage() {
    const { wishList, toggleWishList, fetchWishList } = useWishList();
    const { addToCart } = useCart();

    useEffect(() => {
        fetchWishList();
    }, []);

    if (wishList.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-gray-300 bg-[#222831]">
                <h1 className="text-3xl font-bold">Your Wishlist is empty</h1>
                <Link
                    to="/courses"
                    className="mt-4 px-6 py-3 bg-[#76ABAE] text-[#222831] font-bold rounded-lg hover:bg-[#5e8f91]"
                >
                    Browse Courses
                </Link>
            </div>
        );
    }

    return (
        <section className="bg-[#222831] min-h-screen text-[#EEEEEE] py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-[#76ABAE] mb-10 text-center">
                    Your Wishlist
                </h1>

                <div className="space-y-6">
                    {wishList.map((course) => (
                        <div
                            key={course._id}
                            className="flex flex-col sm:flex-row bg-[#31363F] rounded-2xl shadow-lg overflow-hidden p-4"
                        >
                            {/* Thumbnail */}
                            <div className="w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 overflow-hidden">
                                <img
                                    src={course.thumbnail || "https://via.placeholder.com/200x120"}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                                <div>
                                    <Link
                                        to={`/course/${course._id}`}
                                        className="text-xl font-bold text-gray-200 hover:text-[#76ABAE]"
                                    >
                                        {course.title}
                                    </Link>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {course.category} • {course.lessons?.length || 0} lessons
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-2xl font-bold text-[#EEEEEE]">
                                        ${course.price?.toFixed(2) || "0.00"}
                                    </span>

                                    <div className="flex gap-3">
                                        <button
                                            className="flex items-center gap-1 text-[#76ABAE] hover:text-white transition-colors"
                                            onClick={() => addToCart(course._id)}
                                        >
                                            <ShoppingBag size={20} />
                                            <span className="text-sm hidden sm:inline">Add to Cart</span>
                                        </button>
                                        <button
                                            className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors"
                                            onClick={() => toggleWishList(course._id)}
                                        >
                                            <Trash2 size={20} />
                                            <span className="text-sm hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WishListPage;
