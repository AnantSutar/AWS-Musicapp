const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT5523B5QX7WQ',
    secretAccessKey:'1oT14240yVKeg6hVencinbAfTKMVFdywFfrF+Sne',
    sessionToken: 'IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIERxOL0GZ9jF+hhN9s1bE6x8QIp4EFlksJWwJWTY03RjAiB5VXEGoZVNvXpbscadExPZ5ZnyOUS8M1esKC8Xjxj/2Cq/AgiE//////////8BEAAaDDA1ODI2NDM4MzM0OSIMIqXV5QJjj7HBh6jUKpMCDCiIYdltFe/F3BVMvhiqZxsb2JbwsK0U5eQlXsDEldv7T+ooV8hXIxAtMr6tvIlBpUpfrqH5w0ayby4bUhBkZ0lkDHdGQvWMgJymwiPmRUu2mPWbHOPP6a8YQihFyO/OWxIjQSE1L+B51ju38m4Bc475y8fcsmVRL6llfWDIbwWCql5KiYtGBdBtO/FkIIZGS/jRE42jig/wslfbTDZ+/KeEWRQoINSFQnuJjiNuTI/OVY1N3CGDDfQ6np4iHjZ63Y68qbn4SWV0sh83UeenrdRGDH1RHuGxf5GBT/y90D4TtJfaSmeN9RP5WLy/6HwpS9R0owXyGU7KFrcySIiOvua/E5bjXATnDTlRPRVzUfCDjtcwiYftsAY6ngEb/xU+JWF+86kycxi4NyRQu4OWUiyF7WZng6t9HJBavDCm7aA4IBVjo1ilGKaNvfe2Eewpu9IpiINC9SMUbhur9Tc+Gr34FAellVeDVMtlXKLLcg65iv1SUw5VHu0j2yJ0rUG2hJ1wU+J1kIy3n5V0smEPQiyUngbSDvKDf0VxBJ3zs8jWCaZOujpmMmzomZIEWEkqizrx94l0yhp8aQ=='
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