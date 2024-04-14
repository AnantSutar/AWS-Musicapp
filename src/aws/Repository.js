const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT5523B5QX7WQ',
    secretAccessKey:'1oT14240yVKeg6hVencinbAfTKMVFdywFfrF+Sne',
    sessionToken: 'IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIERxOL0GZ9jF+hhN9s1bE6x8QIp4EFlksJWwJWTY03RjAiB5VXEGoZVNvXpbscadExPZ5ZnyOUS8M1esKC8Xjxj/2Cq/AgiE//////////8BEAAaDDA1ODI2NDM4MzM0OSIMIqXV5QJjj7HBh6jUKpMCDCiIYdltFe/F3BVMvhiqZxsb2JbwsK0U5eQlXsDEldv7T+ooV8hXIxAtMr6tvIlBpUpfrqH5w0ayby4bUhBkZ0lkDHdGQvWMgJymwiPmRUu2mPWbHOPP6a8YQihFyO/OWxIjQSE1L+B51ju38m4Bc475y8fcsmVRL6llfWDIbwWCql5KiYtGBdBtO/FkIIZGS/jRE42jig/wslfbTDZ+/KeEWRQoINSFQnuJjiNuTI/OVY1N3CGDDfQ6np4iHjZ63Y68qbn4SWV0sh83UeenrdRGDH1RHuGxf5GBT/y90D4TtJfaSmeN9RP5WLy/6HwpS9R0owXyGU7KFrcySIiOvua/E5bjXATnDTlRPRVzUfCDjtcwiYftsAY6ngEb/xU+JWF+86kycxi4NyRQu4OWUiyF7WZng6t9HJBavDCm7aA4IBVjo1ilGKaNvfe2Eewpu9IpiINC9SMUbhur9Tc+Gr34FAellVeDVMtlXKLLcg65iv1SUw5VHu0j2yJ0rUG2hJ1wU+J1kIy3n5V0smEPQiyUngbSDvKDf0VxBJ3zs8jWCaZOujpmMmzomZIEWEkqizrx94l0yhp8aQ=='
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