const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552VTDBZ27Y',
    secretAccessKey:'eEzGURKVJcUGpQLnD2+bICzPUWXLQUWPBhg9TyV0',
    sessionToken: 'IQoJb3JpZ2luX2VjEJr//////////wEaCXVzLXdlc3QtMiJIMEYCIQCKba0NY7nkwZpXeFctnEgqafYcvdNOj9sQPjIzWY0i8AIhAO/ZgmdZtc1+k3l27yS7oTuCrpMAu0SJveBUfXSbXbEyKr8CCNP//////////wEQABoMMDU4MjY0MzgzMzQ5Igyoeaz7pycFCclb5jkqkwLpZCKL71dvIVM8Wm9XUTQjO4TtqNk/7Os7C/kNGmqUmXGpBj9vM8G3DYKCTQUznVhw9J6g0VFM5spLfkLLLT/2SW7PdDHEDkNqjIEaoMoWBQxHQLnqdEIqCaKp1mDML5r8K1MooHhzhxKDAQ8uspQ1TqJHEw+ofMGC/ETNjEBaYrU5WYhxmnAtfu+jOl2ezR2dmu8nw0NHu4TknR88RMDP69sLOiNzERVyuob9pWKBHxS5jSl1Pq3gGDPU8Q8/Y6mPi0zDP9zKyqGv45FL7fYpEUckCR8rm6koOHwIlSMV0W7nZDU3jhefmF97IhVybJ1d4EFRNadzccnF03fK3TPRvi+a/KyCZSvBTkp6kFxW2aNhBDCmuv6wBjqcAXIoixFXR+M3qSJhyzQSHpBoBu4B9xk51EKJ8veRjZ4CIbQ5T4t93dHMwShEYGJTgDzccH2yVIU1OJyV9kQcZ3NNUjqaE98n69juhavO0lETM37HRmnUW94B+tQbUgKjUyoiMkQAVdzUsdCTbyw/75Yw3X0TeSSYhcT4h3Vee2mXRqW+KOe/hZJo34NrT1IdnD6GWPiA1Kqweoehlw=='
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