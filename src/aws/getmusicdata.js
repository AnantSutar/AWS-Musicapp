const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552UCQCUJF2',
    secretAccessKey:'OwCGlohZrA97ss9NrGxNg0p+fhq4RZO6to3irD6G',
    sessionToken: 'IQoJb3JpZ2luX2VjEIb//////////wEaCXVzLXdlc3QtMiJHMEUCIQDoY1HO34Q5oBrtcElbZu/U6rPWiH+uqjU4tdaulw+iHQIgK/TRB05ox0l9hT6yNMcMyKHQuJJ5ISnPdB+HvGOu0gAqvwIIv///////////ARAAGgwwNTgyNjQzODMzNDkiDB25Kq6JDztsARMo9iqTAv9mPzaDnwpanFhHZ+dFLHwZZVd1tqmxRPToXlw11Tcr87VDBT8xTrSU6DVK/8u1UldqvTp61+upqsuflWzYNv7+mzW6how55r10NfjRTGdlkiPhnwhnFZ8e2gfSunb2cq9VGj9JuniGhckgn3t6qn9BPP61DDBe5XSYNJeTuEL9glEP+gfNg6S8+L51gkBmp59B5XFb9gpbWvmZ0OFEhnUwGtiOkTF8aZ7nTEKcJrS76wgRrFg6pMew0J/vpq45V1npNDMyFFrk6lXrPU80HDrS9RR87oegeHdnEgYwOlS84797MatKSwKpWfV9oagxDesII8UuB34djr9oCV0zWK7vWJAbCRYKjkdj+1cWDrbdI+7uMMz6+bAGOp0B7LHkUGDCPsAIeZRkouc6dhxUETcbRCrrp2ALvvUG9u1GhtAm2hyeNRsqWI93GRGdQ8RdLzwkpxysjAl78UkycUnWQZ0ALw02axcrMt9g1tu6AlGwhFzDz6NNjXfYKxNvUZNyOwvRodMOsv9Nm0x0LeD/H/zzozmykdva7hCHzd+MMRplNH7Qe0IX1ljBfB8QPNi41ul7rM4yHRTNAQ=='
});


// Function to verify login
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const queryMusicInfo = async (title, year, artist) => {


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