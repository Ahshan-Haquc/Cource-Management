// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trash2, Heart, ShoppingBag, ArrowRight, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function CartPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const { cart, setCart, handleRemoveFromCart } = useCart();

    const fetchCart = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/courses/cart", { withCredentials: true });
            if (data.success) {
                setCart(data.courses);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCart();
    }, []);



    const handleAddAndRemoveFromWishList = async (id) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/courses/addToWishList/${id}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Add to cart failed.");
        }
    }

    const calculateSubtotal = () =>
        cart.reduce((acc, c) => acc + c.price, 0);

    const discount = 0; // can add coupon logic later
    const total = calculateSubtotal() - discount;

    if (loading) {
        return <div className="text-center text-[#EEEEEE] py-20 bg-[#222831] min-h-screen">Loading cart...</div>;
    }

    return (
        <section className="bg-[#222831] min-h-screen text-[#EEEEEE] py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#76ABAE] mb-10 drop-shadow-lg text-center">Your Cart</h1>
                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.length === 0 ? (
                            <div className="bg-[#31363F] p-8 rounded-2xl text-center shadow-lg border border-[#31363F]">
                                <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                                <h2 className="text-2xl font-bold text-gray-300">Your cart is empty.</h2>
                                <p className="text-gray-400 mt-2">Discover your next course!</p>
                                <Link to="/courses" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#76ABAE] text-[#222831] font-bold rounded-lg hover:bg-[#5e8f91] transition-colors">
                                    Browse Courses <ArrowRight size={20} />
                                </Link>
                            </div>
                        ) : (
                            cart.map((course) => (
                                <div
                                    key={course._id}
                                    className="relative flex flex-col sm:flex-row bg-[#31363F] rounded-2xl shadow-lg border border-[#31363F] hover:border-[#76ABAE] transition-all duration-300 overflow-hidden"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-full sm:w-52 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                                        <img
                                            src={course.thumbnail || "https://via.placeholder.com/200x120"}
                                            alt={course.title}
                                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div>
                                            <Link
                                                to={`/course/${course._id}`}
                                                className="text-xl font-bold text-gray-200 hover:text-[#76ABAE] transition-colors"
                                            >
                                                {course.title}
                                            </Link>
                                            <p className="text-sm text-gray-400 mt-1">
                                                By: <span className="font-semibold text-gray-300">{course.instructor?.name || 'Unknown'}</span>
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Category: <span className="font-semibold text-gray-300">{course.category}</span> • <span className="font-semibold text-gray-300">{course.lessons?.length || 0} lessons</span>
                                            </p>
                                            <div className="flex items-center gap-2 mt-2 text-yellow-400">
                                                <span className="font-semibold">{course.rating?.average?.toFixed(1) || '0.0'}</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={16}
                                                            fill={i < Math.round(course.rating?.average || 0) ? "#FFD700" : "none"}
                                                            stroke="#FFD700"
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-400">({course.rating?.count || 0} ratings)</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-2xl font-bold text-[#EEEEEE]">${course.price.toFixed(2)}</span>
                                            <div className="flex gap-3">
                                                <button className="flex items-center gap-1 text-[#76ABAE] hover:text-white transition-colors" onClick={() => handleAddAndRemoveFromWishList(course._id)} title={user && user?.wishlist?.includes(course._id) ? "Remove from Wish-list" : "Add to Wish-list"}>
                                                    {user && user?.wishlist?.includes(course._id) ? (
                                                        <FaHeart size={20} className="text-white" />
                                                    ) : (
                                                        <Heart size={20} />
                                                    )}
                                                    <span className="text-sm hidden sm:inline">Wishlist</span>
                                                </button>
                                                <button className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors" onClick={() => handleRemoveFromCart(course._id)}>
                                                    <Trash2 size={20} />
                                                    <span className="text-sm hidden sm:inline">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Cart Summary */}
                    {cart.length > 0 && (
                        <div className="lg:col-span-1 sticky top-8 h-fit bg-[#31363F] p-8 rounded-2xl shadow-lg border-2 border-[#31363F] hover:border-[#76ABAE] transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

                            <div className="space-y-4 text-gray-300">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span>${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                                <hr className="border-gray-600 my-3" />
                                <div className="flex justify-between font-bold text-2xl text-[#EEEEEE]">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                className="w-full flex items-center justify-center gap-2 bg-[#76ABAE] text-[#222831] font-bold py-4 rounded-lg mt-6 hover:bg-[#5e8f91] transition-colors"
                            >
                                <ShoppingBag size={20} />
                                Proceed to Checkout <ArrowRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CartPage;