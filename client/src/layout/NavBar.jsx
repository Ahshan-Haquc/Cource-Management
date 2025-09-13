// src/components/Navbar.jsx (or wherever your Navbar component is)
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom
import {
    Search, // You might want a search icon
    Heart, // Wishlist icon
    Sun, // Light mode icon
    Moon, // Dark mode icon
    Menu,
    Rss, // For mobile responsiveness
    Cpu
} from "lucide-react";

// Dummy functions for demonstration
const logout = () => console.log("Logging out...");
const toggleTheme = () => console.log("Toggling theme...");

function Navbar({ user, theme, toggleTheme }) { // Assuming theme and toggleTheme are passed as props or managed via context
    const isAdmin = user?.role === "admin";
    const isUser = user?.role === "user";

    // Use theme state to conditionally render Sun or Moon icon
    const ThemeIcon = theme === "light" ? Sun : Moon;

    return (
        <nav className="bg-[#31363F] px-6 py-4 text-[#EEEEEE] shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/Brand Name */}
                <div className="flex gap-3">
                    <Cpu size={32} className="text-[#76ABAE] mr-2" />
                    <Link to="/" className="text-2xl font-extrabold text-[#EEEEEE] hover:text-[#76ABAE] transition-colors duration-200">
                        ByteAcademi
                    </Link>
                </div>


                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex space-x-6 items-center">
                    {/* Admin Links */}
                    {isAdmin && (
                        <>
                            <Link to="/admin/courses" className="hover:text-[#76ABAE] transition-colors duration-200">Manage Courses</Link>
                            <Link to="/admin/users" className="hover:text-[#76ABAE] transition-colors duration-200">Manage Users</Link>
                        </>
                    )}

                    {/* User Links */}
                    {isUser && (
                        <Link to="/purchased" className="hover:text-[#76ABAE] transition-colors duration-200">My Courses</Link>
                    )}

                    {/* Common Links */}
                    <Link to="/courses" className="hover:text-[#76ABAE] transition-colors duration-200">Courses</Link>
                    <Link to="/about" className="hover:text-[#76ABAE] transition-colors duration-200">About</Link>

                    {/* Icons - Wishlist, Theme Toggle */}
                    <div className="flex items-center space-x-4">
                        {isUser && ( // Wishlist only for logged-in users
                            <Link to="/wishlist" className="hover:text-[#76ABAE] transition-transform duration-200 transform hover:scale-110">
                                <Heart size={24} />
                            </Link>
                        )}
                        <button
                            onClick={toggleTheme}
                            className="hover:text-[#76ABAE] transition-transform duration-200 transform hover:scale-110 focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            <ThemeIcon size={24} />
                        </button>
                    </div>

                    {/* Authentication Links */}
                    {user ? (
                        <>
                            <button onClick={logout} className="text-[#222831] bg-[#76ABAE] px-4 py-2 rounded-lg font-semibold hover:bg-[#5e8f91] transition-colors duration-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="hover:text-[#76ABAE] transition-colors duration-200">Signup</Link>
                            <Link to="/login" className="text-[#222831] bg-[#EEEEEE] px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">Login</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="p-2 rounded-md hover:bg-[#5e8f91] focus:outline-none">
                        <Menu size={28} />
                    </button>
                    {/* In a real app, this button would toggle a mobile menu */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;