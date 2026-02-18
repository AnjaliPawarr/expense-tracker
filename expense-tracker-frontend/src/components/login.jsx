import React, { useState } from 'react';
import './App.css';

function Login({ onLogin }) {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Basic Validation
        if (userId.trim() === '') {
            setError('Please enter a User ID.');
            return;
        }


        onLogin(userId.trim());
    };

    return (
        <div className="login-container">
            <h1>Expense Tracker Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                {error && <p className="error-message">{error}</p>}

                <p>Enter your unique User ID to access your expenses:</p>
                <input
                    type="text"
                    placeholder="e.g., Anjali123"
                    value={userId}
                    onChange={(e) => {
                        setUserId(e.target.value);
                        setError('');
                    }}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;