const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552WMDR3C5G',
    secretAccessKey:'3vS5yyWu3G/BvDUO2JPhejRVfQ/U9C6oJNxMSIW2',
    sessionToken: 'IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIHAM3RC+wmHmRnipNpqbixUCTWR3QCpd3VIDDo1qWM7XAiEA9zK/sgFMDfjQhE8ijYdERavYgfpMTJ27zH6KA583Z10qvwIIof//////////ARAAGgwwNTgyNjQzODMzNDkiDM2MW4U3s53Ni3m4byqTArTV3hS/4qwz5cjKLk+/L1FbSpte/igYakDnasbYmi+DFYepFw7h75643tJ/BgvKYjZ1SD74lyPKi9oNphoUEJCr+hEVqTE6rrrC0XTbPNrXPME/6EosJn+LSa3YpV+xGE3/unah8zcAXNn3M+KXtOQKPKORWoKz+vzPT4fxVU0B0VQ8UWYuPGmVgh5T/4i7g0HwOdKg/JFy3ZPWf+1wjyXrb8u+g9D3w3K6gNyCYjJOZBP2eusqDD7Zpnp7QgUOGp1SgQlFCkPVrcSlJkyCusDUcU6H3UINEk31LWCwgFcEUbAzJRkk8Qwu8VMFORU4pW8T5TCAhqzNgrh00SI1/Gi1ObbdJaHIxZonyjTm96LqUM0jMIey87AGOp0BoZGtPejE8Hn6tfTKSEB5AcKwe5w2hCMWru0jbFmEIRW3P3x6D0znW0T5GVm/VZsOeFp2UVR1CvjQHPhzWM9hOPVVBT61FUN1oami857oBePLALgP8J+QSbhkjiudShu68R+8zoG63o9+pxaN9SPclCrIeUlmklCiOXNM4fMNSKktYz4V0KX6lhCZo+dbYmKjaZ+uHfWQqFvpr3lnQA=='
});


// Function to verify login
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TableName = 'Login';

const getUserByEmail = async (email) => {
    const params = {
        TableName,
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },

    };

    try {
        console.log(email)
        const data = await dynamoDB.query(params).promise();
        if (data.Items.length === 0) {
            return null;
        }
        console.log("Sucess")
        return data.Items[0];
    } catch (error) {
        console.error('DynamoDB Error', error);
        throw new Error('Failed to fetch user from database.' + error.message);
    }
};

const verifyUserLogin = async (email, password) => {
    const user = await getUserByEmail(email);
    console.log(user)
    if (!user) {
        throw new Error('User does not exist.');
    }
    if (user.password !== password) {
        throw new Error('Invalid password.');
    }

    return user; // User verified
};

const emailExists = async (email) => {
    console.log(email)
    const params = {
        TableName,
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };

    try {
        const data = await dynamoDB.query(params).promise();
        console.log(data.Count)
        if (data.Count !== 0) {
            return true;
        }
        else{
            return false
        }
    } catch (error) {
        console.error('Error querying DynamoDB:', error);
        throw new Error('Error checking email existence.');
    }
};

const addUser = async (email,username,password) => {
    const params = {
        TableName,
        Item: {
            email,
            username,
            password,
            // Add more attributes as needed
        },
    };

    try {
        await dynamoDB.put(params).promise();
    } catch (error) {
        console.error('Error adding user to DynamoDB:', error);
        throw new Error('Error registering new user.');
    }
};

module.exports = {
    getUserByEmail,
    verifyUserLogin,
    addUser,
    emailExists
};