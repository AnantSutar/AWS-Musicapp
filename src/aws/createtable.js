const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552VTDBZ27Y',
    secretAccessKey:'eEzGURKVJcUGpQLnD2+bICzPUWXLQUWPBhg9TyV0',
    sessionToken: 'IQoJb3JpZ2luX2VjEJr//////////wEaCXVzLXdlc3QtMiJIMEYCIQCKba0NY7nkwZpXeFctnEgqafYcvdNOj9sQPjIzWY0i8AIhAO/ZgmdZtc1+k3l27yS7oTuCrpMAu0SJveBUfXSbXbEyKr8CCNP//////////wEQABoMMDU4MjY0MzgzMzQ5Igyoeaz7pycFCclb5jkqkwLpZCKL71dvIVM8Wm9XUTQjO4TtqNk/7Os7C/kNGmqUmXGpBj9vM8G3DYKCTQUznVhw9J6g0VFM5spLfkLLLT/2SW7PdDHEDkNqjIEaoMoWBQxHQLnqdEIqCaKp1mDML5r8K1MooHhzhxKDAQ8uspQ1TqJHEw+ofMGC/ETNjEBaYrU5WYhxmnAtfu+jOl2ezR2dmu8nw0NHu4TknR88RMDP69sLOiNzERVyuob9pWKBHxS5jSl1Pq3gGDPU8Q8/Y6mPi0zDP9zKyqGv45FL7fYpEUckCR8rm6koOHwIlSMV0W7nZDU3jhefmF97IhVybJ1d4EFRNadzccnF03fK3TPRvi+a/KyCZSvBTkp6kFxW2aNhBDCmuv6wBjqcAXIoixFXR+M3qSJhyzQSHpBoBu4B9xk51EKJ8veRjZ4CIbQ5T4t93dHMwShEYGJTgDzccH2yVIU1OJyV9kQcZ3NNUjqaE98n69juhavO0lETM37HRmnUW94B+tQbUgKjUyoiMkQAVdzUsdCTbyw/75Yw3X0TeSSYhcT4h3Vee2mXRqW+KOe/hZJo34NrT1IdnD6GWPiA1Kqweoehlw=='
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