import fs from 'fs';
const AWS = require('aws-sdk');


// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT5523B5QX7WQ',
    secretAccessKey:'1oT14240yVKeg6hVencinbAfTKMVFdywFfrF+Sne',
    sessionToken: 'IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIERxOL0GZ9jF+hhN9s1bE6x8QIp4EFlksJWwJWTY03RjAiB5VXEGoZVNvXpbscadExPZ5ZnyOUS8M1esKC8Xjxj/2Cq/AgiE//////////8BEAAaDDA1ODI2NDM4MzM0OSIMIqXV5QJjj7HBh6jUKpMCDCiIYdltFe/F3BVMvhiqZxsb2JbwsK0U5eQlXsDEldv7T+ooV8hXIxAtMr6tvIlBpUpfrqH5w0ayby4bUhBkZ0lkDHdGQvWMgJymwiPmRUu2mPWbHOPP6a8YQihFyO/OWxIjQSE1L+B51ju38m4Bc475y8fcsmVRL6llfWDIbwWCql5KiYtGBdBtO/FkIIZGS/jRE42jig/wslfbTDZ+/KeEWRQoINSFQnuJjiNuTI/OVY1N3CGDDfQ6np4iHjZ63Y68qbn4SWV0sh83UeenrdRGDH1RHuGxf5GBT/y90D4TtJfaSmeN9RP5WLy/6HwpS9R0owXyGU7KFrcySIiOvua/E5bjXATnDTlRPRVzUfCDjtcwiYftsAY6ngEb/xU+JWF+86kycxi4NyRQu4OWUiyF7WZng6t9HJBavDCm7aA4IBVjo1ilGKaNvfe2Eewpu9IpiINC9SMUbhur9Tc+Gr34FAellVeDVMtlXKLLcg65iv1SUw5VHu0j2yJ0rUG2hJ1wU+J1kIy3n5V0smEPQiyUngbSDvKDf0VxBJ3zs8jWCaZOujpmMmzomZIEWEkqizrx94l0yhp8aQ=='
});
const musicData = require('./a1.json');
// Function to load data from a1.json and populate DynamoDB table
const loadMusicData = () => {

    const docClient = new AWS.DynamoDB.DocumentClient();

    musicData.songs.forEach(song => {
        const params = {
            TableName: 'music',
            Item: {
                'title': song.title,
                'artist': song.artist,
                'year': parseInt(song.year), // Convert year to number
                'web_url': song.web_url,
                'image_url': song.img_url
            }
        };

        // Put item into DynamoDB table
        docClient.put(params, (err, data) => {
            if (err) {
                console.error('Unable to add song:', song.title, '. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('PutItem succeeded:', song.title);
            }
        });
    });
};

// Call function to load data and populate DynamoDB table
export default loadMusicData;
