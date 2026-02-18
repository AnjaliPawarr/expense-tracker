import React, { useState } from 'react';
import logo from './assets/logo.png'; // आपकी फोटो के अनुसार सही पाथ
import './Login.css'; // एनीमेशन वाला CSS यहाँ काम करेगा

function Login({ onLogin }) {
    const [userId, setUserId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId.trim()) {
            onLogin(userId);
        }
    };

    return (
        <div className="login-container">
            {/* लोगो सेक्शन - यह स्क्रीन के ऊपरी हिस्से में दिखेगा */}
            <div className="logo-section">
                <img src={logo} alt="App Logo" className="main-logo" />
            </div>

            {/* लॉगिन कार्ड */}
            <div className="form-section">
                <h2>Expense Tracker Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter User ID (e.g. anjali123)"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;