import React from 'react';
import UserArea from './UserArea';
import { useLocation } from 'react-router-dom';
import SubscriptionArea from './SubscriptionArea';
import QueryArea from './QueryArea';
import './Main.css';

const MainPage = () => {
    const location = useLocation(); // Get the location object to access state
    const { a } = location.state || {};
    console.log(a.email)
    return (
        <div className="main-page">
            <UserArea userName={a.username || "Default Username"} />
            <div className="content-container">
                <div className="subscription-area">

                    <SubscriptionArea email={a.email || "Default Username"} />
                </div>
                <div className="query-area">

                    <QueryArea email={a.email || "Default Username"} />
                </div>
            </div>
            <a href="/logout" className="logout-link">Logout</a>
        </div>
    );
};

export default MainPage;
