import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
import Navbar from './NavBar';
import {
    Search, // You might want a search icon
    Heart, // Wishlist icon
    Sun, // Light mode icon
    Moon, // Dark mode icon
    Menu,
    Rss, // For mobile responsiveness
    Cpu
} from "lucide-react";

const AppLayout = () => {
    const { user, setUser } = useAuth();

    return (
        <div className="min-h-screen min-w-screen bg-[#222831] flex justify-center">
            <div className="min-w-full max-w-7xl flex flex-col">
                {/* Navbar */}
                <Navbar user={user} />

                <main className="flex-grow">
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default AppLayout;