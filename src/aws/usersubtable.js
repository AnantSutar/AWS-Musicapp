const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552RICIQXH7',
    secretAccessKey:'CLtCptHOem18ynBVOhrLbXZrZ2dWT3wqi39nJOdk',
    sessionToken: 'IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBgirqkZeowekp8H+O2EAZ90A7vWsaIg/ucIpKWrGVS/AiEA4+QMs6DAKMMJEdV8qH8P3JFAzhR3mQSPyQaC8efeH/gqvwIInf//////////ARAAGgwwNTgyNjQzODMzNDkiDPWXervC6msbh5CYKSqTAgyeH3IU1MjpDWoV8jiwEZ2scWz+dZ/9MSEVHiXqiwOYj/HEAE6pUe3nVL9OUDciA3ukeoiNxuPGYIb+j1bgtFhjZbD2ftsvvWQ4fHrdFoGa5549orD+tNq2i8hns+Z8gftsYJNwAMFz1c+rFCBJ4v+NEGHgchEC208T0gZ+mEQGabKNvXxHcz4p53lWVFXkz/s7vXIPcPaKFrwIdwoSMj8iObZcmJZmaYDhiia8sVktSUvHKhy+4k+fwwNaaBwifD+7JAd7Josjd4FgsR2pvCKsbiU3Bn6gvwONa+pyt3SSTVpIjP+CGGLAXbBWGeRZrp2nQ+qw2Nf9N9Avisrjzx//Z+0PbTDh7TmjjEbEDbiU8fe5MKXD8rAGOp0Bjcniz+0tVeb6J61R0mqKkKYkhiYSrpJG4BbCGVHWpOVTbZ1EjqejdMdCfEvy3KzVxtgUw6wm4AxBHNgqF/afn11qQDBfkjP/LXyipbL/XDl0DRW9fthoiCjoPVcps+ceeVF1oNjQRutjexdNXfCw3e29eEzRNqM5cQSueC2Pue34Ke44ICYvs9ablCZDUoME3pRXPDMntngqJd93kw=='
});


// Function to verify login
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const createusermusictable = () => {
    const dynamodb = new AWS.DynamoDB();

// Define table parameters
    const params = {
        TableName: 'Usersub',
        KeySchema: [
            {AttributeName: 'email', KeyType: 'HASH'} // Partition key
        ],
        AttributeDefinitions: [
            {AttributeName: 'email', AttributeType: 'S'}, // String data type for title
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5, // Adjust as needed
            WriteCapacityUnits: 5 // Adjust as needed
        }
    };

    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
        }
    });
};
export default createusermusictable