import React, { useEffect, useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import jsonData from './a1.json';

// AWS S3 client configuration
const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId:'ASIAQ3EGT552RICIQXH7',
        secretAccessKey:'CLtCptHOem18ynBVOhrLbXZrZ2dWT3wqi39nJOdk',
        sessionToken: 'IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBgirqkZeowekp8H+O2EAZ90A7vWsaIg/ucIpKWrGVS/AiEA4+QMs6DAKMMJEdV8qH8P3JFAzhR3mQSPyQaC8efeH/gqvwIInf//////////ARAAGgwwNTgyNjQzODMzNDkiDPWXervC6msbh5CYKSqTAgyeH3IU1MjpDWoV8jiwEZ2scWz+dZ/9MSEVHiXqiwOYj/HEAE6pUe3nVL9OUDciA3ukeoiNxuPGYIb+j1bgtFhjZbD2ftsvvWQ4fHrdFoGa5549orD+tNq2i8hns+Z8gftsYJNwAMFz1c+rFCBJ4v+NEGHgchEC208T0gZ+mEQGabKNvXxHcz4p53lWVFXkz/s7vXIPcPaKFrwIdwoSMj8iObZcmJZmaYDhiia8sVktSUvHKhy+4k+fwwNaaBwifD+7JAd7Josjd4FgsR2pvCKsbiU3Bn6gvwONa+pyt3SSTVpIjP+CGGLAXbBWGeRZrp2nQ+qw2Nf9N9Avisrjzx//Z+0PbTDh7TmjjEbEDbiU8fe5MKXD8rAGOp0Bjcniz+0tVeb6J61R0mqKkKYkhiYSrpJG4BbCGVHWpOVTbZ1EjqejdMdCfEvy3KzVxtgUw6wm4AxBHNgqF/afn11qQDBfkjP/LXyipbL/XDl0DRW9fthoiCjoPVcps+ceeVF1oNjQRutjexdNXfCw3e29eEzRNqM5cQSueC2Pue34Ke44ICYvs9ablCZDUoME3pRXPDMntngqJd93kw=='
    }
});

const ImageUploader = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const uploadImages = async () => {
            setLoading(true);
            setError('');

            for (const song of jsonData.songs) {
                try {
                    const imageResponse = await fetch(song.imageUrl);
                    if (!imageResponse.ok) {
                        throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
                    }
                    const blob = await imageResponse.blob();
                    const fileName = `${song.artist.replace(/ /g, '_')}.jpg`;
                    const params = {
                        Bucket: 'YOUR_BUCKET_NAME',
                        Key: fileName,
                        Body: blob,
                        ContentType: 'image/jpeg'
                    };

                    const command = new PutObjectCommand(params);
                    await s3Client.send(command);
                    console.log(`Upload successful: ${fileName}`);
                } catch (err) {
                    console.error(`Error uploading image ${song.imageUrl}: ${err}`);
                    setError(`Error uploading image ${song.imageUrl}: ${err.message}`);
                    break; // Stop uploading on error
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
