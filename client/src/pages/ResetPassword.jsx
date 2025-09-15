import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Lock, CheckCircle, XCircle } from "lucide-react";

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
            setMessage(res.data.message);
            setIsSuccess(true);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error resetting password");
            setIsSuccess(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#222831] to-[#31363F] p-4">
            <div className="w-full max-w-sm p-8 bg-[#222831] text-[#EEEEEE] rounded-2xl shadow-2xl border-2 border-[#31363F] relative overflow-hidden">

                <div className="flex flex-col items-center mb-6">
                    <Lock size={48} className="text-[#76ABAE] mb-4 drop-shadow-lg" />
                    <h2 className="text-2xl font-bold tracking-tight drop-shadow-sm">Reset Password</h2>
                    <p className="text-sm text-gray-400 mt-2 text-center">Enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full p-3 bg-transparent border-2 border-[#31363F] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76ABAE] transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#76ABAE] text-[#222831] font-bold rounded-lg shadow-md hover:bg-[#5e8f91] transition-colors"
                    >
                        Reset Password
                    </button>
                </form>

                {message && (
                    <div className={`mt-6 p-4 rounded-lg flex items-center gap-2 ${isSuccess ? 'bg-green-700' : 'bg-red-700'}`}>
                        {isSuccess ? <CheckCircle size={20} /> : <XCircle size={20} />}
                        <p className="text-sm">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;