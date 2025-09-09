import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div className="min-h-screen min-w-screen bg-[#222831] flex justify-center">
            <div className="min-w-full max-w-7xl flex flex-col">
                {/* Navbar */}
                <nav className="bg-[#76ABAE] p-4 text-white flex justify-between">
                    <Link to="/" className="text-xl font-bold">Course Management</Link>
                    <div className="flex space-x-4">
                        <Link to="/purchased" className="hover:underline">My Courses</Link>
                        <Link to="/signup" className="hover:underline">Signup</Link>
                        <Link to="/login" className="hover:underline">Login</Link>
                    </div>
                </nav>

                {/* Routes */}
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