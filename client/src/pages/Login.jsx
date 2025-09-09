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
                // save token in localStorage
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.user.role);
                setUser(res.data.user);
                // Redirect based on role
                if (res.data.user.role === 'admin') {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            console.error(err);
            setError("Login failed. Try again.");
        }
    };

    return (
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
                <button
                    type="submit"
                    className="w-full bg-[#76ABAE] text-white py-2 rounded hover:bg-[#5e8f91] transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
