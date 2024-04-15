const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552RICIQXH7',
    secretAccessKey:'CLtCptHOem18ynBVOhrLbXZrZ2dWT3wqi39nJOdk',
    sessionToken: 'IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBgirqkZeowekp8H+O2EAZ90A7vWsaIg/ucIpKWrGVS/AiEA4+QMs6DAKMMJEdV8qH8P3JFAzhR3mQSPyQaC8efeH/gqvwIInf//////////ARAAGgwwNTgyNjQzODMzNDkiDPWXervC6msbh5CYKSqTAgyeH3IU1MjpDWoV8jiwEZ2scWz+dZ/9MSEVHiXqiwOYj/HEAE6pUe3nVL9OUDciA3ukeoiNxuPGYIb+j1bgtFhjZbD2ftsvvWQ4fHrdFoGa5549orD+tNq2i8hns+Z8gftsYJNwAMFz1c+rFCBJ4v+NEGHgchEC208T0gZ+mEQGabKNvXxHcz4p53lWVFXkz/s7vXIPcPaKFrwIdwoSMj8iObZcmJZmaYDhiia8sVktSUvHKhy+4k+fwwNaaBwifD+7JAd7Josjd4FgsR2pvCKsbiU3Bn6gvwONa+pyt3SSTVpIjP+CGGLAXbBWGeRZrp2nQ+qw2Nf9N9Avisrjzx//Z+0PbTDh7TmjjEbEDbiU8fe5MKXD8rAGOp0Bjcniz+0tVeb6J61R0mqKkKYkhiYSrpJG4BbCGVHWpOVTbZ1EjqejdMdCfEvy3KzVxtgUw6wm4AxBHNgqF/afn11qQDBfkjP/LXyipbL/XDl0DRW9fthoiCjoPVcps+ceeVF1oNjQRutjexdNXfCw3e29eEzRNqM5cQSueC2Pue34Ke44ICYvs9ablCZDUoME3pRXPDMntngqJd93kw=='
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