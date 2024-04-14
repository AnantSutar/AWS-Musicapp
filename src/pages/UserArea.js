import React from 'react';
import "./UserArea.css"
const UserArea = ({ userName }) => {
    return (
        <div className="user-area-container">
            Welcome, {userName}
        </div>
    );
};

export default UserArea;
