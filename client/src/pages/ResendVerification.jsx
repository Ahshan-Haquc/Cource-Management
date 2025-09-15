import React, { useState } from 'react';

export default function ResendVerification() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/resend-verification", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            setMessage(data.message || 'If an account exists, a verification mail will be sent.');
        } catch (err) {
            console.error(err);
            setMessage('Server error');
        }
    };

    return (
        <div>
            <h2>Resend verification</h2>
            <form onSubmit={submit}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
                <button type="submit">Resend</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
