import React, { useEffect, useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import jsonData from './a1.json';

// AWS S3 client configuration
const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId:'ASIAQ3EGT552UCQCUJF2',
        secretAccessKey:'OwCGlohZrA97ss9NrGxNg0p+fhq4RZO6to3irD6G',
        sessionToken: 'IQoJb3JpZ2luX2VjEIb//////////wEaCXVzLXdlc3QtMiJHMEUCIQDoY1HO34Q5oBrtcElbZu/U6rPWiH+uqjU4tdaulw+iHQIgK/TRB05ox0l9hT6yNMcMyKHQuJJ5ISnPdB+HvGOu0gAqvwIIv///////////ARAAGgwwNTgyNjQzODMzNDkiDB25Kq6JDztsARMo9iqTAv9mPzaDnwpanFhHZ+dFLHwZZVd1tqmxRPToXlw11Tcr87VDBT8xTrSU6DVK/8u1UldqvTp61+upqsuflWzYNv7+mzW6how55r10NfjRTGdlkiPhnwhnFZ8e2gfSunb2cq9VGj9JuniGhckgn3t6qn9BPP61DDBe5XSYNJeTuEL9glEP+gfNg6S8+L51gkBmp59B5XFb9gpbWvmZ0OFEhnUwGtiOkTF8aZ7nTEKcJrS76wgRrFg6pMew0J/vpq45V1npNDMyFFrk6lXrPU80HDrS9RR87oegeHdnEgYwOlS84797MatKSwKpWfV9oagxDesII8UuB34djr9oCV0zWK7vWJAbCRYKjkdj+1cWDrbdI+7uMMz6+bAGOp0B7LHkUGDCPsAIeZRkouc6dhxUETcbRCrrp2ALvvUG9u1GhtAm2hyeNRsqWI93GRGdQ8RdLzwkpxysjAl78UkycUnWQZ0ALw02axcrMt9g1tu6AlGwhFzDz6NNjXfYKxNvUZNyOwvRodMOsv9Nm0x0LeD/H/zzozmykdva7hCHzd+MMRplNH7Qe0IX1ljBfB8QPNi41ul7rM4yHRTNAQ=='
    }
});

const ImageUploader = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const uploadImages = async () => {
            setLoading(true);
            setError('');

            let id = 0
            for (const song of jsonData.songs) {
                try {
                    const imageResponse = await fetch(song.img_url);
                    if (!imageResponse.ok) {
                        throw new Error("Failed to fetch image: ${imageResponse.statusText}");
                    }
                    const blob = await imageResponse.blob();
                    // const fileName = `${song.artist.replace(/ /g, '_')}-${song.title.replace(/ /g, '_')}.jpg`;
                    const fileName = `${song.artist.replace(/ /g, '_')}${id}.jpg`;
                    id += 1;
                    const params = {
                        Bucket: 's3958744artistimg',
                        Key: `photosOfArtists/${fileName}`,
                        Body: blob,
                        ContentType: 'image/jpeg'
                    };


                    const command = new PutObjectCommand(params);
                    await s3Client.send(command);
                    console.log("Upload successful: ${fileName}");
                } catch (err) {
                    console.error("Error uploading image ${song.img_url}:, err");
                    setError("Error uploading image ${song.img_url}: ${err.message}");
                    break;
                }
            }
            setLoading(false);
        };

        uploadImages();
    }, []);

    return (
        <div>
            <h1>Image Uploader</h1>
            {loading && <p>Uploading images, please wait...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && <p>Check the console for upload status.</p>}
        </div>
    );
};

export default ImageUploader;