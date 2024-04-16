import React, {useState} from 'react';
import UserArea from './UserArea';
import { useLocation } from 'react-router-dom';
import SubscriptionArea from './SubscriptionArea';
import QueryArea from './QueryArea';
import './Main.css';

const MainPage = () => {
    const location = useLocation(); // Get the location object to access state
    const currentState = location.state || {};
    const a = currentState.state;
    const [smusic, setsmusic] = useState([]);

    // Function to update subscribed music in SubscriptionArea
    const updateSubscribedMusic = (music) => {
        setsmusic(prevSubscribedMusic => [...prevSubscribedMusic, music]);
    };
    return (
        <div className="main-page">
            <UserArea userName={a.username || "Default Username"} />
            <div className="content-container">
                <div className="subscription-area">

                    <SubscriptionArea email={a.email || "Default Username"} smusic={smusic} />
                </div>
                <div className="query-area">

                    <QueryArea email={a.email || "Default Username"} onSubscribe={updateSubscribedMusic} />
                </div>
            </div>
            <a href="/" className="logout-link">Logout</a>
        </div>
    );
};

export default MainPage;
