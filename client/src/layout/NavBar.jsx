// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
    Search,
    Heart,
    ShoppingCart,
    Sun,
    Moon,
    Menu,
    Cpu,
    Bell,
    CircleUserRound,
    ChevronUp,
    ChevronDown,
    UserRound
} from "lucide-react";
import { useAuth } from "../context/AuthContext";


function Navbar({ user, theme, toggleTheme, cartCount = 0 }) {
    const { setUser } = useAuth();
    const isAdmin = user?.role === "admin";
    const isUser = user?.role === "user";

    const ThemeIcon = theme === "light" ? Sun : Moon;

    const [isProfileIconVisible, setIsProfileIconVisible] = useState(false);

    const logout = async () => {
        localStorage.removeItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
        if (res.data.success) {
            setUser(null);
            window.location.href = "/login";
        } else {
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <nav className="bg-[#31363F] px-6 py-4 text-[#EEEEEE] shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/Brand */}
                <div className="flex gap-3">
                    <Cpu size={32} className="text-[#76ABAE] mr-2" />
                    <Link
                        to="/"
                        className="text-2xl font-extrabold text-[#EEEEEE] hover:text-[#76ABAE] transition-colors duration-200"
                    >
                        DevZone Academy
                    </Link>
                </div>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex space-x-6 items-center">
                    {/* Admin Links */}
                    {isAdmin && (
                        <>
                            <Link
                                to="/admin/courses"
                                className="hover:text-[#76ABAE] transition-colors duration-200"
                            >
                                Manage Courses
                            </Link>
                            <Link
                                to="/admin/users"
                                className="hover:text-[#76ABAE] transition-colors duration-200"
                            >
                                Manage Users
                            </Link>
                        </>
                    )}

                    {/* User course */}


                    {/* Common Links */}
                    <Link
                        to="/courses"
                        className="hover:text-[#76ABAE] transition-colors duration-200"
                    >
                        Courses
                    </Link>
                    <Link
                        to="/about"
                        className="hover:text-[#76ABAE] transition-colors duration-200"
                    >
                        About
                    </Link>

                    {/* Icons Section */}
                    <div className="flex items-center space-x-5">
                        {/* Search */}
                        <Link
                            to="/search"
                            className="hover:text-[#76ABAE] transition-transform duration-200 transform hover:scale-110"
                        >
                            <Search size={22} />
                        </Link>

                        {/* Wishlist */}
                        {isUser && (
                            <Link
                                to="/wishlist"
                                className="hover:text-[#76ABAE] transition-transform duration-200 transform hover:scale-110"
                            >
                                <Heart size={22} />
                            </Link>
                        )}

                        {/* Cart */}
                        {isUser && (
                            <Link
                                to="/cart"
                                className="relative hover:text-[#76ABAE] transition-transform duration-200 transform hover:scale-110"
                            >
                                <ShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#76ABAE] text-[#222831] text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Notifications */}
                        {isUser && (
                            <Link
                                to="/notifications"
                                className="hover:text-[#76ABAE] transition-transform duration-200 transform hover:scale-110"
                            >
                                <Bell size={22} />
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="hover:text-[#76ABAE] transition-transform duration-200 transform hover:scale-110 focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            <ThemeIcon size={22} />
                        </button>
                    </div>


                    {/* Auth Buttons */}
                    {user ? (
                        <div className="relative z-10">
                            <div
                                className="group flex justify-center items-center gap-2 p-1 border border-gray-800 rounded-lg duration-300 hover:cursor-pointer hover:bg-gray-800"
                                onClick={() => setIsProfileIconVisible(prev => !prev)}
                            >
                                <CircleUserRound size={22} className="group-hover:text-[#76ABAE] transition-transform duration-200 transform" />
                                {isProfileIconVisible ? (
                                    <ChevronUp size={15} className="group-hover:text-[#76ABAE] transition-transform duration-200 transform" />
                                ) : (
                                    <ChevronDown size={15} className="group-hover:text-[#76ABAE] transition-transform duration-200 transform" />
                                )}
                            </div>

                            {isProfileIconVisible && (
                                <div
                                    className="absolute top-10 right-0 w-48 bg-[#222831] border border-gray-700 rounded-lg shadow-xl animate-fade-in"
                                >
                                    <div className="flex flex-col">
                                        <div className="px-4 py-2 text-gray-300 bg-gray-800 transition-colors duration-200 flex items-center"><UserRound size={18} className="mr-2" />{user.name}</div>
                                        <Link
                                            to="/purchased"
                                            className="px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-[#76ABAE] transition-colors duration-200"
                                        >
                                            My Courses
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-[#76ABAE] transition-colors duration-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/signup"
                                className="hover:text-[#76ABAE] transition-colors duration-200"
                            >
                                Signup
                            </Link>
                            <Link
                                to="/login"
                                className="text-[#222831] bg-[#EEEEEE] px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button className="p-2 rounded-md hover:bg-[#5e8f91] focus:outline-none">
                        <Menu size={28} />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
