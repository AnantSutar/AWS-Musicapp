import fs from 'fs';
const AWS = require('aws-sdk');


// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552VTDBZ27Y',
    secretAccessKey:'eEzGURKVJcUGpQLnD2+bICzPUWXLQUWPBhg9TyV0',
    sessionToken: 'IQoJb3JpZ2luX2VjEJr//////////wEaCXVzLXdlc3QtMiJIMEYCIQCKba0NY7nkwZpXeFctnEgqafYcvdNOj9sQPjIzWY0i8AIhAO/ZgmdZtc1+k3l27yS7oTuCrpMAu0SJveBUfXSbXbEyKr8CCNP//////////wEQABoMMDU4MjY0MzgzMzQ5Igyoeaz7pycFCclb5jkqkwLpZCKL71dvIVM8Wm9XUTQjO4TtqNk/7Os7C/kNGmqUmXGpBj9vM8G3DYKCTQUznVhw9J6g0VFM5spLfkLLLT/2SW7PdDHEDkNqjIEaoMoWBQxHQLnqdEIqCaKp1mDML5r8K1MooHhzhxKDAQ8uspQ1TqJHEw+ofMGC/ETNjEBaYrU5WYhxmnAtfu+jOl2ezR2dmu8nw0NHu4TknR88RMDP69sLOiNzERVyuob9pWKBHxS5jSl1Pq3gGDPU8Q8/Y6mPi0zDP9zKyqGv45FL7fYpEUckCR8rm6koOHwIlSMV0W7nZDU3jhefmF97IhVybJ1d4EFRNadzccnF03fK3TPRvi+a/KyCZSvBTkp6kFxW2aNhBDCmuv6wBjqcAXIoixFXR+M3qSJhyzQSHpBoBu4B9xk51EKJ8veRjZ4CIbQ5T4t93dHMwShEYGJTgDzccH2yVIU1OJyV9kQcZ3NNUjqaE98n69juhavO0lETM37HRmnUW94B+tQbUgKjUyoiMkQAVdzUsdCTbyw/75Yw3X0TeSSYhcT4h3Vee2mXRqW+KOe/hZJo34NrT1IdnD6GWPiA1Kqweoehlw=='
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


        docClient.put(params, (err, data) => {
            if (err) {
                console.error('Unable to add song:', song.title, '. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('PutItem succeeded:', song.title);
            }
        });
    });
};


export default loadMusicData;
