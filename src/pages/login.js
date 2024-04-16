import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('https://tdsttoydr1.execute-api.us-east-1.amazonaws.com/loginPage/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password
    //             })
    //         });
    //         console.log(response);
    //         if (response.status === 200 && response.data) {
    //             console.log('Login successful:', response.data);
    //             localStorage.setItem('userLoggedIn', JSON.stringify(response.data));
    //             navigate('/');
    //             window.location.reload()
    //         } else {
    //             alert('Invalid email or password. Please try again.');
    //         }
    //
    //     } catch (error) {
    //         console.error('Error logging in:', error);
    //         alert('Failed to log in. Please try again.');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://tdsttoydr1.execute-api.us-east-1.amazonaws.com/loginPage/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.statusCode === 200) {
                const state = JSON.parse(responseData.body);

                navigate("/main", { state: { state } });
            } else if (responseData.statusCode === 401) {
                alert('Invalid password');
            } else {
                alert('User not found');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    const handleRegisterClick = () => {
        // Navigate to the register page
        navigate("/register");
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <span onClick={handleRegisterClick} className="register-link">Register</span></p>
        </div>
    );
};

export default LoginPage;
