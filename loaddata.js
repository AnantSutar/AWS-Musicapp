import fs from 'fs';
const AWS = require('aws-sdk');


// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552VZTRB3YW',
    secretAccessKey:'UxGTP9DmFyrSops88nWCnAV4F7mgFsZ5KOrBNT2y',
    sessionToken: 'IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIDLA2Uc3kAeW8sHpD5sOPo77Z07RptdbMVrqr1yXYXweAiEAw/Ne78MUXzjBoE0eobn4HrvWiH2d8A0sQzr9cVugAVoqvwIImP//////////ARAAGgwwNTgyNjQzODMzNDkiDBf4Y9OUIfcINruxFCqTAmWHEZZdXNSOMNSc6v2pO1CMYEMcnmBdUtCIaCYl2Q+KjPT5Le63y+Kl5BWk87SIR6RdybIr/qce7ltzGv6lqRkdqlwl0Hve7OurvkK0ROgQ9mTuKll9EzBc6zpznHYP6rUHuGF8n6Eui2mUngtJDs8XF/Cby79ooSo0/hqKxRVR/SMiV1weyl/eqfF7BA72aYdLUu4vlEnhrET3hlTezMNg2vJItm/17tLhLf0Ep0sXta6e4P0ZgExliJ8zt2be+GHfepbgYiZimczXxDORwnDpw0NANlCuyfdTmrrzBommlAJ/3dxf20d5mmXy3qmUnrETlnlCIiVkQqNMueQdwSDWvKyXVL+iAQthKDp84VbQ2yVAMJzF8bAGOp0B47voqgDnReMA/Fwu1N3NhMcGfcPlbd0eAfcpVClgwfkq3+vxLSkeZFwChLfdx6sk+7thKotX/r7iULKeyoJRUgA/dnmSyuHxwyD06QyntEWB0FLSg4gJiI7ewMfpDmcBmWViU2mL6XgSbnff+JyfGQ71sn77OPCCb2aoTAKeOKcYH2PPvMPUSzHoqRemiVYak33mSutTAE8a4TTylg=='
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
