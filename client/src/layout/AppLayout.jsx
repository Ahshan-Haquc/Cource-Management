import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AppLayout = () => {
    const { user, setUser } = useAuth();

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
        <div className="min-h-screen min-w-screen bg-[#222831] flex justify-center">
            <div className="min-w-full max-w-7xl flex flex-col">
                {/* Navbar */}
                <nav className="bg-[#31363F] px-10 py-4 text-white flex justify-between">
                    {user?.role !== "admin" && (
                        <Link to="/" className="text-xl font-bold" >TechOrbit IT Course</Link>
                    )}
                    <div className="flex space-x-4 items-center">
                        {user ? (
                            <>
                                {user?.role === "user" && (
                                    <Link to="/purchased" className="hover:scale-105">My Courses</Link>
                                )}

                                <button onClick={logout} className="hover:scale-105 hover:cursor-pointer">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/signup" className="hover:scale-105">Signup</Link>
                                <Link to="/login" className="hover:scale-105">Login</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* pages */}
                <main className="flex-grow p-6">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className=" text-white text-center p-3">
                    © 2025 Course Management System
                </footer>
            </div>
        </div>
    );
};

export default AppLayout;