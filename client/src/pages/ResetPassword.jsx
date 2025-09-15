import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded">
            <h2 className="text-xl mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-2 mb-4 text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-green-500 py-2">Reset Password</button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}

export default ResetPassword;
