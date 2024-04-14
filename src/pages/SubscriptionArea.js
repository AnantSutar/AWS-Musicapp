// SubscriptionArea.jsx

import React, { useEffect, useState } from 'react';
import { deleteUserMusic, getUserMusicDataByEmail } from "../aws/createtable";
import queryMusicInfo from "../aws/getmusicdata";
import './SubscriptionArea.css';

const SubscriptionArea = ({ email }) => {
    const [subscribedMusic, setSubscribedMusic] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubscribedMusic = async () => {
            try {
                // Get music data directly by email
                const musicData = await getUserMusicDataByEmail(email);
                if (musicData.length === 0) {
                    setSubscribedMusic([]);
                    setLoading(false);
                    return;
                }
                setSubscribedMusic(musicData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching subscribed music:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchSubscribedMusic();
    }, [email]);

    const handleRemoveSubscription = async (title) => {
        try {
            await deleteUserMusic(email, title);
            setSubscribedMusic(prevMusic => prevMusic.filter(music => music.title !== title));
        } catch (error) {
            console.error('Error removing subscription:', error);
            // Handle error as needed
        }
    };

    if (loading) {
        return <div className="subscription-area-container">Loading...</div>;
    }

    if (error) {
        return <div className="subscription-area-container">Error: {error.message}</div>;
    }

    return (
        <div className="subscription-area-container">
            <h1 className="subscription-area-title">Subscribed Music</h1>
            {subscribedMusic.length === 0 ? (
                <p>No subscriptions</p>
            ) : (
                <ul className="subscription-list">
                    {subscribedMusic.map((music, index) => (
                        <li className="subscription-item" key={index}>
                            <div className="subscription-card">
                                <h3 className="subscription-title">{music.title}</h3>
                                <p className="subscription-info">Artist: {music.artist}</p>
                                <p className="subscription-info">Year: {music.year}</p>
                                <button className="remove-button"
                                        onClick={() => handleRemoveSubscription(music.title)}>Remove
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubscriptionArea;
