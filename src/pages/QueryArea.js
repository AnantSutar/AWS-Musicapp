// QueryArea.jsx

import React, { useEffect, useState } from 'react';
import './QueryArea.css'; // Import CSS file for styling
import queryMusicInfo from "../aws/getmusicdata";
import { addUserMusic } from "../aws/createtable";

const QueryArea = ({ email, onSubscribe }) => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');
    const [queryResult, setQueryResult] = useState('');
    const [queried, setQueried] = useState(false);

    useEffect(() => {
        console.log("Query Result Updated:", queryResult);
    }, [queryResult]);

    const handleQuery = async () => {
        // Perform the query here, you can implement this logic as per your requirement
        // For now, just set a dummy query result
        const result = await queryMusicInfo(title, year, artist)
        console.log(result)

        // Check if queryResult is empty, if empty show "No result is retrieved. Please query again"
        const items = result.Items || [];
        // Update state with query result
        console.log(items)
        setQueryResult(items);
        setQueried(true);
        console.log(queryResult)

    };

    const handleSubscribe = (music) => {
        // Add data using addUserMusic function
        // You may need to get the user's email or any other relevant information to add the data
        console.log(email,title)
        if(addUserMusic(email,music.title,music.artist,music.year,music.image)){
            alert("Success")
            onSubscribe();
            window.location.reload()
        }
    };


    return (
        <div className="query-area-container">
            <h2>Query Area</h2>
            <div className="input-group">
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Year</label>
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Artist</label>
                <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
            </div>
            <button className="button" onClick={handleQuery}>Query</button>
            {queried && (
                <div className="query-result">
                    {queryResult.length > 0 ? (
                        queryResult.map((music, index) => (
                            <div className="music-card" key={index}>
                                <img src={music.imageURL} alt={music.title} />
                                <p>Title: {music.title}</p>
                                <p>Artist: {music.artist}</p>
                                <p>Year: {music.year}</p>
                                <button className="button" onClick={() => handleSubscribe(music)}>Subscribe</button>
                            </div>
                        ))
                    ) : (
                        <p>No result is retrieved. Please query again</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default QueryArea;
