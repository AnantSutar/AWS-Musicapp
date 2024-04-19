import React, { useEffect, useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import jsonData from './a1.json';

// AWS S3 client configuration
const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId:'ASIAQ3EGT552W4SBLAZH',
        secretAccessKey:'Tx+JEoyKvC+VnKVuMju8Pg9WiEXEWI9ViFoB2juK',
        sessionToken: 'IQoJb3JpZ2luX2VjEMD//////////wEaCXVzLXdlc3QtMiJHMEUCIEWWtOwBF58djvjUg2KOcFoWNYt+4hbHYXXyPOR2Fb27AiEA69FwiO4tMUwC+HT985kTPYE5TysrdVywaw51wOZBjEwqvwII+f//////////ARAAGgwwNTgyNjQzODMzNDkiDORTXQT6RDdb8dAVvyqTAkN+6ToKW/bUSjxbTKujPlmpWCYvlQ4Mb/+ATWzknHyhV/GkzgUi6qhrLWrLsQ8M8SYU91JzygH0cx+Lmvr3akN7HjObph1Yt5+7RXa09RU53JBqvoWQ3wXi7ZHmNFFqldPFAAFHlCpVGar1i2kIHkmwFTEmy4y7JL1J153PflrtoP4lQ/FI162HEImGSF+4GQuwBUNiPdAJTSYfaqrjtmR4lJdxiJwx61+qvCb9JxzFvDPN0Vu+lqYbLn6uJnWIfKK7XydeFti0Nbq/T5ljJWyTBbTZbIv18E5grnOYebhL1fR7bzP/pnByNUKoNY4YLeVRfPxlPJ4wAlyX1i/Tkwd7U2L2iE4M1HBUuNN3pwyiXwBwMJfqhrEGOp0B1rJ8u45t+6ektbwH9A3G3g4WhdgucPdxC2JaTglqUsgIxELG+DL0TDWMQHwCvj9Ts75tioSVjwQOuTtbxTXA0qtlE2pf1AX1GB6IWsNxhTlQrmU+aw5C2TuDy81U/NoAS8z2d/euSI0OImiR+F0T5iUhpaAY6FZVcY4QuNzubklK0QlhhdCKiY2fuTyJvbnxCWdtzuyY3U+vLv2K4g=='
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