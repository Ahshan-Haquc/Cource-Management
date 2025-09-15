// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                "http://localhost:5000/api/auth/userRegister",
                formData,
                { withCredentials: true }
            );

            if (res.data.success) {
                setMessage("Signup successful! Please check your email for verification link.");
                // Optionally redirect after delay
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
        <div className="w-screen h-[90vh] flex items-center">
            <div className="max-w-md mx-auto bg-[#31363F] text-[#EEEEEE] p-8 shadow-lg rounded z-10">
                <h2 className="text-2xl font-bold mb-6 text-center">User Signup</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}
                {message && <p className="text-green-500 mb-3">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-white"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-[#EEEEEE]"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-[#EEEEEE]"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#76ABAE] text-white py-2 rounded hover:bg-[#5e8f91] transition"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
