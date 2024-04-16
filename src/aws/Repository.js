const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552UCQCUJF2',
    secretAccessKey:'OwCGlohZrA97ss9NrGxNg0p+fhq4RZO6to3irD6G',
    sessionToken: 'IQoJb3JpZ2luX2VjEIb//////////wEaCXVzLXdlc3QtMiJHMEUCIQDoY1HO34Q5oBrtcElbZu/U6rPWiH+uqjU4tdaulw+iHQIgK/TRB05ox0l9hT6yNMcMyKHQuJJ5ISnPdB+HvGOu0gAqvwIIv///////////ARAAGgwwNTgyNjQzODMzNDkiDB25Kq6JDztsARMo9iqTAv9mPzaDnwpanFhHZ+dFLHwZZVd1tqmxRPToXlw11Tcr87VDBT8xTrSU6DVK/8u1UldqvTp61+upqsuflWzYNv7+mzW6how55r10NfjRTGdlkiPhnwhnFZ8e2gfSunb2cq9VGj9JuniGhckgn3t6qn9BPP61DDBe5XSYNJeTuEL9glEP+gfNg6S8+L51gkBmp59B5XFb9gpbWvmZ0OFEhnUwGtiOkTF8aZ7nTEKcJrS76wgRrFg6pMew0J/vpq45V1npNDMyFFrk6lXrPU80HDrS9RR87oegeHdnEgYwOlS84797MatKSwKpWfV9oagxDesII8UuB34djr9oCV0zWK7vWJAbCRYKjkdj+1cWDrbdI+7uMMz6+bAGOp0B7LHkUGDCPsAIeZRkouc6dhxUETcbRCrrp2ALvvUG9u1GhtAm2hyeNRsqWI93GRGdQ8RdLzwkpxysjAl78UkycUnWQZ0ALw02axcrMt9g1tu6AlGwhFzDz6NNjXfYKxNvUZNyOwvRodMOsv9Nm0x0LeD/H/zzozmykdva7hCHzd+MMRplNH7Qe0IX1ljBfB8QPNi41ul7rM4yHRTNAQ=='
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