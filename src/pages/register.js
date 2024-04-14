import React, { useState } from 'react';
import './register.css';
import {addUser, emailExists} from "../aws/Repository";
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleRegister = async () => {
        // Implement registration logic here
        console.log(email, username, password)
        if (await emailExists(email)) {
            alert("Try different email")
        } else {
            addUser(email, username, password)
            navigate("/");
        }

        console.log('Registering with:', email, username, password);
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
