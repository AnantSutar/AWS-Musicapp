const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552UCQCUJF2',
    secretAccessKey:'OwCGlohZrA97ss9NrGxNg0p+fhq4RZO6to3irD6G',
    sessionToken: 'IQoJb3JpZ2luX2VjEIb//////////wEaCXVzLXdlc3QtMiJHMEUCIQDoY1HO34Q5oBrtcElbZu/U6rPWiH+uqjU4tdaulw+iHQIgK/TRB05ox0l9hT6yNMcMyKHQuJJ5ISnPdB+HvGOu0gAqvwIIv///////////ARAAGgwwNTgyNjQzODMzNDkiDB25Kq6JDztsARMo9iqTAv9mPzaDnwpanFhHZ+dFLHwZZVd1tqmxRPToXlw11Tcr87VDBT8xTrSU6DVK/8u1UldqvTp61+upqsuflWzYNv7+mzW6how55r10NfjRTGdlkiPhnwhnFZ8e2gfSunb2cq9VGj9JuniGhckgn3t6qn9BPP61DDBe5XSYNJeTuEL9glEP+gfNg6S8+L51gkBmp59B5XFb9gpbWvmZ0OFEhnUwGtiOkTF8aZ7nTEKcJrS76wgRrFg6pMew0J/vpq45V1npNDMyFFrk6lXrPU80HDrS9RR87oegeHdnEgYwOlS84797MatKSwKpWfV9oagxDesII8UuB34djr9oCV0zWK7vWJAbCRYKjkdj+1cWDrbdI+7uMMz6+bAGOp0B7LHkUGDCPsAIeZRkouc6dhxUETcbRCrrp2ALvvUG9u1GhtAm2hyeNRsqWI93GRGdQ8RdLzwkpxysjAl78UkycUnWQZ0ALw02axcrMt9g1tu6AlGwhFzDz6NNjXfYKxNvUZNyOwvRodMOsv9Nm0x0LeD/H/zzozmykdva7hCHzd+MMRplNH7Qe0IX1ljBfB8QPNi41ul7rM4yHRTNAQ=='
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
                    resolve([]);
                } else {
                    const musicData = data.Items.map(item => ({
                        title: item.title,
                        artist: item.artist,
                        year: item.year,

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