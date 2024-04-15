const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552WMDR3C5G',
    secretAccessKey:'3vS5yyWu3G/BvDUO2JPhejRVfQ/U9C6oJNxMSIW2',
    sessionToken: 'IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIHAM3RC+wmHmRnipNpqbixUCTWR3QCpd3VIDDo1qWM7XAiEA9zK/sgFMDfjQhE8ijYdERavYgfpMTJ27zH6KA583Z10qvwIIof//////////ARAAGgwwNTgyNjQzODMzNDkiDM2MW4U3s53Ni3m4byqTArTV3hS/4qwz5cjKLk+/L1FbSpte/igYakDnasbYmi+DFYepFw7h75643tJ/BgvKYjZ1SD74lyPKi9oNphoUEJCr+hEVqTE6rrrC0XTbPNrXPME/6EosJn+LSa3YpV+xGE3/unah8zcAXNn3M+KXtOQKPKORWoKz+vzPT4fxVU0B0VQ8UWYuPGmVgh5T/4i7g0HwOdKg/JFy3ZPWf+1wjyXrb8u+g9D3w3K6gNyCYjJOZBP2eusqDD7Zpnp7QgUOGp1SgQlFCkPVrcSlJkyCusDUcU6H3UINEk31LWCwgFcEUbAzJRkk8Qwu8VMFORU4pW8T5TCAhqzNgrh00SI1/Gi1ObbdJaHIxZonyjTm96LqUM0jMIey87AGOp0BoZGtPejE8Hn6tfTKSEB5AcKwe5w2hCMWru0jbFmEIRW3P3x6D0znW0T5GVm/VZsOeFp2UVR1CvjQHPhzWM9hOPVVBT61FUN1oami857oBePLALgP8J+QSbhkjiudShu68R+8zoG63o9+pxaN9SPclCrIeUlmklCiOXNM4fMNSKktYz4V0KX6lhCZo+dbYmKjaZ+uHfWQqFvpr3lnQA=='
});

// Create DynamoDB service object
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const addUserMusic = async (email, title,artist,year,imageURL) => {
    const params = {
        TableName: 'usermusicsub',
        Item: {
            'email': email,
            'title': title,
            'artist': artist,
            'year': year,
            'imageURL': imageURL
        }
    };

    await dynamoDB.put(params, (err, data) => {
        if (err) {
            console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Added item:', JSON.stringify(data, null, 2));
            return true
        }
    });
};


const deleteUserMusic = (email, title) => {
    const params = {
        TableName: 'usermusicsub',
        Key: {
            'email': email,
            'title': title
        }
    };

    dynamoDB.delete(params, (err, data) => {
        if (err) {
            console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Deleted item:', JSON.stringify(data, null, 2));
        }
    });
};


const getUserMusicDataByEmail = async (email) => {
    const params = {
        TableName: 'usermusicsub',
        KeyConditionExpression: 'email = :e',
        ExpressionAttributeValues: {
            ':e': email
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.query(params, (err, data) => {
            if (err) {
                console.error('Unable to query. Error JSON:', JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log('Query succeeded:', JSON.stringify(data, null, 2));
                if (data.Items.length === 0) {
                    resolve([]); // Resolve with an empty array if no subscriptions found
                } else {
                    const musicData = data.Items.map(item => ({
                        title: item.title,
                        artist: item.artist,
                        year: item.year,
                        // Include other properties as needed
                    }));
                    console.log('Music Data:', musicData);
                    resolve(musicData);
                }
            }
        });
    });
};
export  {
    addUserMusic,
    deleteUserMusic,
    getUserMusicDataByEmail

}