const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552WMDR3C5G',
    secretAccessKey:'3vS5yyWu3G/BvDUO2JPhejRVfQ/U9C6oJNxMSIW2',
    sessionToken: 'IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIHAM3RC+wmHmRnipNpqbixUCTWR3QCpd3VIDDo1qWM7XAiEA9zK/sgFMDfjQhE8ijYdERavYgfpMTJ27zH6KA583Z10qvwIIof//////////ARAAGgwwNTgyNjQzODMzNDkiDM2MW4U3s53Ni3m4byqTArTV3hS/4qwz5cjKLk+/L1FbSpte/igYakDnasbYmi+DFYepFw7h75643tJ/BgvKYjZ1SD74lyPKi9oNphoUEJCr+hEVqTE6rrrC0XTbPNrXPME/6EosJn+LSa3YpV+xGE3/unah8zcAXNn3M+KXtOQKPKORWoKz+vzPT4fxVU0B0VQ8UWYuPGmVgh5T/4i7g0HwOdKg/JFy3ZPWf+1wjyXrb8u+g9D3w3K6gNyCYjJOZBP2eusqDD7Zpnp7QgUOGp1SgQlFCkPVrcSlJkyCusDUcU6H3UINEk31LWCwgFcEUbAzJRkk8Qwu8VMFORU4pW8T5TCAhqzNgrh00SI1/Gi1ObbdJaHIxZonyjTm96LqUM0jMIey87AGOp0BoZGtPejE8Hn6tfTKSEB5AcKwe5w2hCMWru0jbFmEIRW3P3x6D0znW0T5GVm/VZsOeFp2UVR1CvjQHPhzWM9hOPVVBT61FUN1oami857oBePLALgP8J+QSbhkjiudShu68R+8zoG63o9+pxaN9SPclCrIeUlmklCiOXNM4fMNSKktYz4V0KX6lhCZo+dbYmKjaZ+uHfWQqFvpr3lnQA=='
});


// Function to verify login
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const queryMusicInfo = async (title, year, artist) => {
    // Perform the query here, using the provided parameters

    if (year) {
        year = parseInt(year);
    }


    const params = {
        TableName: 'music',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
        FilterExpression: '',
    };

    if (title) {
        params.ExpressionAttributeNames['#title'] = 'title';
        params.ExpressionAttributeValues[':title'] = title;
        params.FilterExpression += '#title = :title';
    }

    if (year) {
        params.ExpressionAttributeNames['#year'] = 'year';
        params.ExpressionAttributeValues[':year'] = year;
        params.FilterExpression += (params.FilterExpression ? ' AND ' : '') + '#year = :year';
    }

    if (artist) {
        params.ExpressionAttributeNames['#artist'] = 'artist';
        params.ExpressionAttributeValues[':artist'] = artist;
        params.FilterExpression += (params.FilterExpression ? ' AND ' : '') + '#artist = :artist';
    }

    try {
        const data = await dynamoDB.scan(params).promise();
        console.log(data)
        return data;
    } catch (err) {
        console.error("Unable to query. Error JSON:", JSON.stringify(err, null, 2));
        throw err;
    }
};

export default queryMusicInfo