const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552RICIQXH7',
    secretAccessKey:'CLtCptHOem18ynBVOhrLbXZrZ2dWT3wqi39nJOdk',
    sessionToken: 'IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBgirqkZeowekp8H+O2EAZ90A7vWsaIg/ucIpKWrGVS/AiEA4+QMs6DAKMMJEdV8qH8P3JFAzhR3mQSPyQaC8efeH/gqvwIInf//////////ARAAGgwwNTgyNjQzODMzNDkiDPWXervC6msbh5CYKSqTAgyeH3IU1MjpDWoV8jiwEZ2scWz+dZ/9MSEVHiXqiwOYj/HEAE6pUe3nVL9OUDciA3ukeoiNxuPGYIb+j1bgtFhjZbD2ftsvvWQ4fHrdFoGa5549orD+tNq2i8hns+Z8gftsYJNwAMFz1c+rFCBJ4v+NEGHgchEC208T0gZ+mEQGabKNvXxHcz4p53lWVFXkz/s7vXIPcPaKFrwIdwoSMj8iObZcmJZmaYDhiia8sVktSUvHKhy+4k+fwwNaaBwifD+7JAd7Josjd4FgsR2pvCKsbiU3Bn6gvwONa+pyt3SSTVpIjP+CGGLAXbBWGeRZrp2nQ+qw2Nf9N9Avisrjzx//Z+0PbTDh7TmjjEbEDbiU8fe5MKXD8rAGOp0Bjcniz+0tVeb6J61R0mqKkKYkhiYSrpJG4BbCGVHWpOVTbZ1EjqejdMdCfEvy3KzVxtgUw6wm4AxBHNgqF/afn11qQDBfkjP/LXyipbL/XDl0DRW9fthoiCjoPVcps+ceeVF1oNjQRutjexdNXfCw3e29eEzRNqM5cQSueC2Pue34Ke44ICYvs9ablCZDUoME3pRXPDMntngqJd93kw=='
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