import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch('https://k72do1kpaj.execute-api.us-east-1.amazonaws.com/userRegistration/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });

            if (response.status !== 200) {
                const errorData = await response.json();
                if (errorData.statusCode === 409) {
                    alert('Email already registered. Please use a different email.');
                } else {
                    throw new Error('Failed to register user');
                }
                return;
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error('Error registering user:', error);
            alert('Failed to register user. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>
            <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
