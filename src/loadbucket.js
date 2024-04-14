import Axios from "axios";
const AWS = require('aws-sdk');


// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT5525FGGMSZS',
    secretAccessKey:'WxEi9g5jLjC/dCm/nv971a03VPFHW959qWQGsRtP',
    sessionToken: 'IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIQCESNVAXLeVKAfF6LsZmi6L9XfhlUENB3pYwtcwbXh1RQIgaC5uP/6PNCmAl1HAmWGC/OBdaTHurP4aYrtgCSzWBCQqtgIIVxAAGgwwNTgyNjQzODMzNDkiDErlmrvq+SxsFSiU0SqTAnB10t0lNsmXq3Z5mwgnRe7J2+inpFT+Qj04A6lIxFvN4/SMDOuEd0Xqg+2fdLm9DS9hW83jrtw7MmhBInKnEZo1PEuEKTthzOJvLJwVic4Yj3arqycCt4FgW9eQR0uReENqoXa8Gk5Px4/r2KOIo3Mws0rg//MoVQQ8xpCLse9H3Oz3c+WdvchwrlHZoET/AwNj/HA+I/EOCWfIrH5KB11HwN5vR+VGjzsNKzhcnMRXnG+8VHhOnU73P/7kR9mBb8z6FQ6u3s2wzUkQa1BfKZ/h7d4k3wPDheDYZAdVY0aCx1fneOL886U8FozWfOxI56b93UNmAl93YD1VTIpjbwXGgMI21CfCrkGVzJDXiy12bRMJMJak47AGOp0B9bvaImDEcmoBZtx0PhKkM1cRJZWO6zX/LAWPHuXB354ioqBatXmNidqd6OqeDOsx2PbMR3eNThUlqmcevn9UXVnfnMkheiOiXzp5kqvh1vk6zd9/FJUScw1JYi64bo+W2BMTbOWZsU8lmFeBfuyVxV9LbMJcF58/oc8/I7bVwYwkPQYDTMl3S+/IyV94iP8Zkzr6Ktyrfeo1LRhE/Q=='
});

// Create DynamoDB DocumentClient
const docClient = new AWS.DynamoDB.DocumentClient();

// Create S3 instance
const s3 = new AWS.S3();

// Function to download and upload images
async function downloadAndUploadImages() {
    try {
        const params = {
            TableName: 'music', // Update with your DynamoDB table name
            ProjectionExpression: 'image_url' // Specify the attribute containing the image URL
        };

        const data = await docClient.scan(params).promise();

        // Iterate through items and download/upload images
        for (const item of data.Items) {
            const imageUrl = item.image_url;

            // Download image
            const response = await Axios.get(imageUrl, {
                responseType: 'arraybuffer'
            });

            // Generate a unique filename
            const filename = imageUrl.split('/').pop(); // Extract filename from URL

            // Upload image to S3
            const uploadParams = {
                Bucket: 's3958744artistimg', // Update with your S3 bucket name
                Key: filename,
                Body: response.data,
                ContentType: 'image/jpeg'
            };

            await s3.upload(uploadParams).promise();

            console.log(`Uploaded ${filename} to S3`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call function to download and upload images
export default downloadAndUploadImages;
