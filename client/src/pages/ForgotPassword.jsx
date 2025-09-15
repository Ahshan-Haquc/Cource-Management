import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error sending reset email");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded">
            <h2 className="text-xl mb-4">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 mb-4 text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 py-2">Send Reset Link</button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}

export default ForgotPassword;
