// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, CheckCircle, XCircle, TabletSmartphone } from "lucide-react";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post(
                "https://cource-management-backend.vercel.app/api/auth/userLogin",
                formData,
                { withCredentials: true }
            );

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.user.role);
                setUser(res.data.user);

                if (res.data.user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            console.error(err);
            // Handle backend errors for unverified email or others
            if (err.response?.data?.message === "Please verify your email first.") {
                setError("Your email is not verified. Please check your inbox.");
            } else {
                setError("Login failed. Check your credentials and try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#222831] to-[#31363F] text-[#EEEEEE] p-4">
            <div className="w-full max-w-5xl bg-[#222831] shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
                {/* Left Section: Welcome Message */}
                <div className="hidden md:flex md:w-1/2 bg-[#31363F] p-10 items-center justify-center text-center">
                    <div className="flex flex-col items-center">
                        <TabletSmartphone size={100} className="text-[#76ABAE] mb-6 drop-shadow-lg animate-pulse" />
                        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Welcome Back!</h1>
                        <p className="text-lg text-gray-400 max-w-xs">
                            Sign in to continue your learning journey and access your courses.
                        </p>
                    </div>
                </div>

                {/* Right Section: Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex flex-col items-center mb-6">
                        <User size={48} className="text-[#76ABAE] mb-4" />
                        <h2 className="text-3xl font-bold mb-2">User Login</h2>
                        <p className="text-gray-400">Access your account</p>
                    </div>

                    {error && (
                        <div className="bg-red-700 p-3 rounded-lg flex items-center gap-2 mb-4">
                            <XCircle size={20} />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 bg-transparent border-2 border-[#31363F] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76ABAE] transition-colors"
                                required
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-4 bg-transparent border-2 border-[#31363F] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76ABAE] transition-colors"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label htmlFor="remember" className="flex items-center text-gray-400">
                                <input type="checkbox" id="remember" className="mr-2 accent-[#76ABAE]" />
                                Remember me
                            </label>
                            <Link to={'/forgot-password'} className="text-[#76ABAE] hover:text-white transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-[#76ABAE] text-[#222831] font-bold rounded-lg shadow-md hover:bg-[#5e8f91] transition-colors"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center text-gray-400 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#76ABAE] hover:text-white transition-colors">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;