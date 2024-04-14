import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import MainPage from './pages/Main';
import configureAws from "./aws/AWSconfig";
import createmusictable from "./aws/createtable";

import loadMusicData from "./aws/loaddata";
import downloadAndUploadImages from "./loadbucket";
import createusermusictable from "./aws/usersubtable";
import RegisterPage from "./pages/register";


function App() {
    const [username, setUsername] = useState('');

    const handleLogin = (user) => {
        setUsername(user);
    };
    configureAws()
    // createmusictable()
    // loadMusicData()
    //downloadAndUploadImages()

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage onLogin={handleLogin}/>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/main" element={<MainPage username={username}/>} />
            </Routes>
        </Router>
    );
}

export default App;
