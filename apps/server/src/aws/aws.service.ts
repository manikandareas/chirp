import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { config } from 'src/config';

@Injectable()
export class AwsService {
    private readonly s3Client = new S3Client({
        region: config.awsS3Region,
        credentials: {
            accessKeyId: config.awsAccessKeyId,
            secretAccessKey: config.awsSecretAccessKey,
        },
    });

    /**
     * Uploads a file to S3.
     *
     * @param {string} key - The key (file original name) under which to store the file in S3.
     * @param {Buffer} body - The content of the file to upload.
     * @return {Promise<void>} - A promise that resolves when the upload is complete.
     */
    async uploadToS3(key: string, body: Buffer) {
        const uploadParams = {
            Bucket: config.awsBucketName,
            Key: key,
            Body: body,
            ContentType: 'image/jpeg',
        };

        const parallelUploadS3 = new Upload({
            client: this.s3Client,
            tags: [], // optional tags
            queueSize: 4, // optional concurrency configuration
            leavePartsOnError: false, // optional manually handle dropped parts
            params: uploadParams,
        });

        const progressCallback = (progress) => {
            console.log(progress);
        };

        parallelUploadS3.on('httpUploadProgress', progressCallback);

        return parallelUploadS3.done();
    }
}
