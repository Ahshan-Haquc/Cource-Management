// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
                "http://localhost:5000/api/auth/userLogin",
                formData,
                { withCredentials: true }
            );

            if (res.data.token) {
                alert("Login successful!");
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
            // যদি ব্যাকএন্ড থেকে বলে user verified নয়
            if (err.response?.data?.message === "Please verify your email first.") {
                setError("⚠️ Your email is not verified. Please check your inbox.");
            } else {
                setError("Login failed. Try again.");
            }
        }
    };

    return (
        <div className="w-screen h-[90vh] flex items-center">
            <div className="max-w-md mx-auto bg-[#31363F] text-[#EEEEEE] p-8 shadow-lg rounded">
                <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex justify-between items-center">
                        <div className="">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-white">Remember me</label>
                        </div>
                        <p className="text-sm text-white text-right cursor-pointer hover:text-[#76ABAE] duration-200">
                            Forgot password?
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#76ABAE] text-white py-2 rounded hover:bg-[#5e8f91] transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
