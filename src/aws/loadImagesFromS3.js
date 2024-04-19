import fs from 'fs';
import {useState} from "react";
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update with your desired AWS region
    accessKeyId:'ASIAQ3EGT552W4SBLAZH',
    secretAccessKey:'Tx+JEoyKvC+VnKVuMju8Pg9WiEXEWI9ViFoB2juK',
    sessionToken: 'IQoJb3JpZ2luX2VjEMD//////////wEaCXVzLXdlc3QtMiJHMEUCIEWWtOwBF58djvjUg2KOcFoWNYt+4hbHYXXyPOR2Fb27AiEA69FwiO4tMUwC+HT985kTPYE5TysrdVywaw51wOZBjEwqvwII+f//////////ARAAGgwwNTgyNjQzODMzNDkiDORTXQT6RDdb8dAVvyqTAkN+6ToKW/bUSjxbTKujPlmpWCYvlQ4Mb/+ATWzknHyhV/GkzgUi6qhrLWrLsQ8M8SYU91JzygH0cx+Lmvr3akN7HjObph1Yt5+7RXa09RU53JBqvoWQ3wXi7ZHmNFFqldPFAAFHlCpVGar1i2kIHkmwFTEmy4y7JL1J153PflrtoP4lQ/FI162HEImGSF+4GQuwBUNiPdAJTSYfaqrjtmR4lJdxiJwx61+qvCb9JxzFvDPN0Vu+lqYbLn6uJnWIfKK7XydeFti0Nbq/T5ljJWyTBbTZbIv18E5grnOYebhL1fR7bzP/pnByNUKoNY4YLeVRfPxlPJ4wAlyX1i/Tkwd7U2L2iE4M1HBUuNN3pwyiXwBwMJfqhrEGOp0B1rJ8u45t+6ektbwH9A3G3g4WhdgucPdxC2JaTglqUsgIxELG+DL0TDWMQHwCvj9Ts75tioSVjwQOuTtbxTXA0qtlE2pf1AX1GB6IWsNxhTlQrmU+aw5C2TuDy81U/NoAS8z2d/euSI0OImiR+F0T5iUhpaAY6FZVcY4QuNzubklK0QlhhdCKiY2fuTyJvbnxCWdtzuyY3U+vLv2K4g=='
});

const LoadImagesFromS3 = () => {

    const [images, setImages] = useState('');
    const [error, setError] = useState('');

    const fetchImagesFromS3 = async () => {
        try {
            const s3 = new AWS.S3();

            const response = await s3.listObjectsV2({
                Bucket: 's3958744artistimg',
                Prefix: "photosOfArtist/"
            }).promise();

            const bucketUrl = "https://s3958744artistimg.s3.amazonaws.com/";
            const imageUrls = response.Contents.map(obj => ({
                key: obj.Key,
                url: bucketUrl + obj.Key
            }));

            setImages(imageUrls);
        } catch (err) {
            console.error("Error fetching from S3", err);
            setError("Failed to load images from S3.");
        }
    };
};

export default LoadImagesFromS3;