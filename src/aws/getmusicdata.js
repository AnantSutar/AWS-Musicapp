const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT5523B5QX7WQ',
    secretAccessKey:'1oT14240yVKeg6hVencinbAfTKMVFdywFfrF+Sne',
    sessionToken: 'IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIERxOL0GZ9jF+hhN9s1bE6x8QIp4EFlksJWwJWTY03RjAiB5VXEGoZVNvXpbscadExPZ5ZnyOUS8M1esKC8Xjxj/2Cq/AgiE//////////8BEAAaDDA1ODI2NDM4MzM0OSIMIqXV5QJjj7HBh6jUKpMCDCiIYdltFe/F3BVMvhiqZxsb2JbwsK0U5eQlXsDEldv7T+ooV8hXIxAtMr6tvIlBpUpfrqH5w0ayby4bUhBkZ0lkDHdGQvWMgJymwiPmRUu2mPWbHOPP6a8YQihFyO/OWxIjQSE1L+B51ju38m4Bc475y8fcsmVRL6llfWDIbwWCql5KiYtGBdBtO/FkIIZGS/jRE42jig/wslfbTDZ+/KeEWRQoINSFQnuJjiNuTI/OVY1N3CGDDfQ6np4iHjZ63Y68qbn4SWV0sh83UeenrdRGDH1RHuGxf5GBT/y90D4TtJfaSmeN9RP5WLy/6HwpS9R0owXyGU7KFrcySIiOvua/E5bjXATnDTlRPRVzUfCDjtcwiYftsAY6ngEb/xU+JWF+86kycxi4NyRQu4OWUiyF7WZng6t9HJBavDCm7aA4IBVjo1ilGKaNvfe2Eewpu9IpiINC9SMUbhur9Tc+Gr34FAellVeDVMtlXKLLcg65iv1SUw5VHu0j2yJ0rUG2hJ1wU+J1kIy3n5V0smEPQiyUngbSDvKDf0VxBJ3zs8jWCaZOujpmMmzomZIEWEkqizrx94l0yhp8aQ=='
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