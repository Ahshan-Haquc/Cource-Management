import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState({ loading: true, success: null, message: '' });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const id = params.get('id');

        if (!token || !id) {
            setStatus({ loading: false, success: false, message: 'Invalid verification link.' });
            return;
        }

        (async () => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/verify-email", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, id })
                });
                const data = await res.json();
                if (res.ok) {
                    setStatus({ loading: false, success: true, message: data.message || 'Verified.' });
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setStatus({ loading: false, success: false, message: data.message || 'Verification failed.' });
                }
            } catch (err) {
                console.error(err);
                setStatus({ loading: false, success: false, message: 'Server error.' });
            }
        })();
    }, [location.search, navigate]);

    if (status.loading) return <div>Verifying...</div>;

    return (
        <div>
            {status.success ? (
                <div>
                    <h2>Success</h2>
                    <p>{status.message}</p>
                    <p>Redirecting to login...</p>
                </div>
            ) : (
                <div>
                    <h2>Failed</h2>
                    <p>{status.message}</p>
                    <a href="/resend-verification">Resend verification</a>
                </div>
            )}
        </div>
    );
}
