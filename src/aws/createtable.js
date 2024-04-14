const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552VZTRB3YW',
    secretAccessKey:'UxGTP9DmFyrSops88nWCnAV4F7mgFsZ5KOrBNT2y',
    sessionToken: 'IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIDLA2Uc3kAeW8sHpD5sOPo77Z07RptdbMVrqr1yXYXweAiEAw/Ne78MUXzjBoE0eobn4HrvWiH2d8A0sQzr9cVugAVoqvwIImP//////////ARAAGgwwNTgyNjQzODMzNDkiDBf4Y9OUIfcINruxFCqTAmWHEZZdXNSOMNSc6v2pO1CMYEMcnmBdUtCIaCYl2Q+KjPT5Le63y+Kl5BWk87SIR6RdybIr/qce7ltzGv6lqRkdqlwl0Hve7OurvkK0ROgQ9mTuKll9EzBc6zpznHYP6rUHuGF8n6Eui2mUngtJDs8XF/Cby79ooSo0/hqKxRVR/SMiV1weyl/eqfF7BA72aYdLUu4vlEnhrET3hlTezMNg2vJItm/17tLhLf0Ep0sXta6e4P0ZgExliJ8zt2be+GHfepbgYiZimczXxDORwnDpw0NANlCuyfdTmrrzBommlAJ/3dxf20d5mmXy3qmUnrETlnlCIiVkQqNMueQdwSDWvKyXVL+iAQthKDp84VbQ2yVAMJzF8bAGOp0B47voqgDnReMA/Fwu1N3NhMcGfcPlbd0eAfcpVClgwfkq3+vxLSkeZFwChLfdx6sk+7thKotX/r7iULKeyoJRUgA/dnmSyuHxwyD06QyntEWB0FLSg4gJiI7ewMfpDmcBmWViU2mL6XgSbnff+JyfGQ71sn77OPCCb2aoTAKeOKcYH2PPvMPUSzHoqRemiVYak33mSutTAE8a4TTylg=='
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