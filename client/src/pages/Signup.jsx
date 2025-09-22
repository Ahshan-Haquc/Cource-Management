// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, CheckCircle, XCircle, Rocket } from "lucide-react";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const res = await axios.post(
                "https://cource-management-backend.vercel.app/api/auth/userRegister",
                formData,
                { withCredentials: true }
            );

            if (res.data.success) {
                setMessage("Signup successful! Please check your email for a verification link.");
                // Optionally redirect after a delay
                setTimeout(() => {
                    navigate("/login");
                }, 5000);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Signup failed. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#222831] to-[#31363F] text-[#EEEEEE] p-4">
            <div className="w-full max-w-5xl bg-[#222831] shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse">
                {/* Right Section: Welcome Message */}
                <div className="hidden md:flex md:w-1/2 bg-[#31363F] p-10 items-center justify-center text-center">
                    <div className="flex flex-col items-center">
                        <Rocket size={100} className="text-[#76ABAE] mb-6 drop-shadow-lg animate-pulse" />
                        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Join Our Community!</h1>
                        <p className="text-lg text-gray-400 max-w-xs">
                            Sign up today and start your journey with our expert-led courses.
                        </p>
                    </div>
                </div>

                {/* Left Section: Signup Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex flex-col items-center mb-6">
                        <UserPlus size={48} className="text-[#76ABAE] mb-4" />
                        <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
                        <p className="text-gray-400">Get started in minutes</p>
                    </div>

                    {error && (
                        <div className="bg-red-700 p-3 rounded-lg flex items-center gap-2 mb-4">
                            <XCircle size={20} />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-700 p-3 rounded-lg flex items-center gap-2 mb-4">
                            <CheckCircle size={20} />
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-4 bg-transparent border-2 border-[#31363F] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76ABAE] transition-colors"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 bg-transparent border-2 border-[#31363F] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76ABAE] transition-colors"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-4 bg-transparent border-2 border-[#31363F] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76ABAE] transition-colors"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-4 bg-[#76ABAE] text-[#222831] font-bold rounded-lg shadow-md hover:bg-[#5e8f91] transition-colors"
                        >
                            Signup
                        </button>
                    </form>

                    <div className="mt-6 text-center text-gray-400 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#76ABAE] hover:text-white transition-colors">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;