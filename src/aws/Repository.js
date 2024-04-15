const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552RICIQXH7',
    secretAccessKey:'CLtCptHOem18ynBVOhrLbXZrZ2dWT3wqi39nJOdk',
    sessionToken: 'IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBgirqkZeowekp8H+O2EAZ90A7vWsaIg/ucIpKWrGVS/AiEA4+QMs6DAKMMJEdV8qH8P3JFAzhR3mQSPyQaC8efeH/gqvwIInf//////////ARAAGgwwNTgyNjQzODMzNDkiDPWXervC6msbh5CYKSqTAgyeH3IU1MjpDWoV8jiwEZ2scWz+dZ/9MSEVHiXqiwOYj/HEAE6pUe3nVL9OUDciA3ukeoiNxuPGYIb+j1bgtFhjZbD2ftsvvWQ4fHrdFoGa5549orD+tNq2i8hns+Z8gftsYJNwAMFz1c+rFCBJ4v+NEGHgchEC208T0gZ+mEQGabKNvXxHcz4p53lWVFXkz/s7vXIPcPaKFrwIdwoSMj8iObZcmJZmaYDhiia8sVktSUvHKhy+4k+fwwNaaBwifD+7JAd7Josjd4FgsR2pvCKsbiU3Bn6gvwONa+pyt3SSTVpIjP+CGGLAXbBWGeRZrp2nQ+qw2Nf9N9Avisrjzx//Z+0PbTDh7TmjjEbEDbiU8fe5MKXD8rAGOp0Bjcniz+0tVeb6J61R0mqKkKYkhiYSrpJG4BbCGVHWpOVTbZ1EjqejdMdCfEvy3KzVxtgUw6wm4AxBHNgqF/afn11qQDBfkjP/LXyipbL/XDl0DRW9fthoiCjoPVcps+ceeVF1oNjQRutjexdNXfCw3e29eEzRNqM5cQSueC2Pue34Ke44ICYvs9ablCZDUoME3pRXPDMntngqJd93kw=='
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