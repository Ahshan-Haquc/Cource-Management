// src/pages/Verify.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Verify() {
    const { token } = useParams();
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
                setMessage(res.data);
            } catch (err) {
                setMessage("Verification failed or link expired.");
            }
        };
        verifyEmail();
    }, [token]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>{message}</p>
        </div>
    );
}

export default Verify;
