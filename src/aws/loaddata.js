import fs from 'fs';
const AWS = require('aws-sdk');


// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552WMDR3C5G',
    secretAccessKey:'3vS5yyWu3G/BvDUO2JPhejRVfQ/U9C6oJNxMSIW2',
    sessionToken: 'IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIHAM3RC+wmHmRnipNpqbixUCTWR3QCpd3VIDDo1qWM7XAiEA9zK/sgFMDfjQhE8ijYdERavYgfpMTJ27zH6KA583Z10qvwIIof//////////ARAAGgwwNTgyNjQzODMzNDkiDM2MW4U3s53Ni3m4byqTArTV3hS/4qwz5cjKLk+/L1FbSpte/igYakDnasbYmi+DFYepFw7h75643tJ/BgvKYjZ1SD74lyPKi9oNphoUEJCr+hEVqTE6rrrC0XTbPNrXPME/6EosJn+LSa3YpV+xGE3/unah8zcAXNn3M+KXtOQKPKORWoKz+vzPT4fxVU0B0VQ8UWYuPGmVgh5T/4i7g0HwOdKg/JFy3ZPWf+1wjyXrb8u+g9D3w3K6gNyCYjJOZBP2eusqDD7Zpnp7QgUOGp1SgQlFCkPVrcSlJkyCusDUcU6H3UINEk31LWCwgFcEUbAzJRkk8Qwu8VMFORU4pW8T5TCAhqzNgrh00SI1/Gi1ObbdJaHIxZonyjTm96LqUM0jMIey87AGOp0BoZGtPejE8Hn6tfTKSEB5AcKwe5w2hCMWru0jbFmEIRW3P3x6D0znW0T5GVm/VZsOeFp2UVR1CvjQHPhzWM9hOPVVBT61FUN1oami857oBePLALgP8J+QSbhkjiudShu68R+8zoG63o9+pxaN9SPclCrIeUlmklCiOXNM4fMNSKktYz4V0KX6lhCZo+dbYmKjaZ+uHfWQqFvpr3lnQA=='
});
const musicData = require('./a1.json');
// Function to load data from a1.json and populate DynamoDB table
const loadMusicData = () => {

    const docClient = new AWS.DynamoDB.DocumentClient();

    musicData.songs.forEach(song => {
        const params = {
            TableName: 'music',
            Item: {
                'title': song.title,
                'artist': song.artist,
                'year': parseInt(song.year), // Convert year to number
                'web_url': song.web_url,
                'image_url': song.img_url
            }
        };

        // Put item into DynamoDB table
        docClient.put(params, (err, data) => {
            if (err) {
                console.error('Unable to add song:', song.title, '. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('PutItem succeeded:', song.title);
            }
        });
    });
};

// Call function to load data and populate DynamoDB table
export default loadMusicData;
