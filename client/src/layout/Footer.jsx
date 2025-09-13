// src/components/FooterSection.jsx
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Rss, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#222831] to-[#31363F] text-[#EEEEEE] py-16 px-6">
            <div className="container mx-auto max-w-7xl flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
                {/* Brand and Copyright Section */}
                <div className="mb-8 md:mb-0">
                    <div className="flex gap-3">
                        <Cpu size={32} className="text-[#76ABAE] mr-2" />
                        <Link to="/" className="text-2xl font-extrabold text-[#EEEEEE] hover:text-[#76ABAE] transition-colors duration-200">
                            ByteAcademi
                        </Link>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">
                        &copy; {new Date().getFullYear()} ByteAcademy. <br className="md:hidden" /> All rights reserved.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 mb-8 md:mb-0">
                    <a href="#" className="font-semibold hover:text-[#76ABAE] transition-colors duration-200">About</a>
                    <a href="#" className="font-semibold hover:text-[#76ABAE] transition-colors duration-200">Contact</a>
                    <a href="#" className="font-semibold hover:text-[#76ABAE] transition-colors duration-200">Terms of Service</a>
                    <a href="#" className="font-semibold hover:text-[#76ABAE] transition-colors duration-200">Privacy Policy</a>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center md:justify-start gap-4">
                    <a href="#" className="p-2 rounded-full border-2 border-[#EEEEEE] text-[#EEEEEE] hover:bg-[#76ABAE] hover:border-[#76ABAE] hover:text-[#222831] transition-all duration-300">
                        <Facebook size={20} />
                    </a>
                    <a href="#" className="p-2 rounded-full border-2 border-[#EEEEEE] text-[#EEEEEE] hover:bg-[#76ABAE] hover:border-[#76ABAE] hover:text-[#222831] transition-all duration-300">
                        <Twitter size={20} />
                    </a>
                    <a href="#" className="p-2 rounded-full border-2 border-[#EEEEEE] text-[#EEEEEE] hover:bg-[#76ABAE] hover:border-[#76ABAE] hover:text-[#222831] transition-all duration-300">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="p-2 rounded-full border-2 border-[#EEEEEE] text-[#EEEEEE] hover:bg-[#76ABAE] hover:border-[#76ABAE] hover:text-[#222831] transition-all duration-300">
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}