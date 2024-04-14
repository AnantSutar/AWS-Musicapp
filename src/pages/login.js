import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { verifyUserLogin } from '../aws/Repository'; // Import verifyLogin function

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const a = await verifyUserLogin(email, password);

            if (a) {
                // Redirect to main page on successful login
                console.log("here")
                navigate("/main", { state: { a } });
            }

        } catch (e) {
            alert("Wrong")
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useHistory hook
// import './login.css'; // Import CSS file for styling
//
// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // Get the history object
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Here you can add your logic for authentication
//         // For now, just redirect to the main page
//         navigate("/main") // Redirect to main page
//     };
//
//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="input-group">
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div className="input-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };
//
// export default LoginPage;
