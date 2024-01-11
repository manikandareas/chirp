import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { config } from '~/config';

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
     * @param {string} mimeType - The MIME type of the file.
     * @return {Promise<void>} - A promise that resolves when the upload is complete.
     */
    async uploadToS3(key: string, body: Buffer, mimeType: string) {
        const uploadParams = {
            Bucket: config.awsBucketName,
            Key: key,
            Body: body,
            ContentType: mimeType,
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

    /**
     * Deletes an object from the S3 bucket.
     *
     * @param {string} key - The key of the object to delete.
     * @return {Promise<void>} A promise that resolves when the object is successfully deleted.
     */
    async deleteFromS3(key: string) {
        const deleteParams = {
            Bucket: config.awsBucketName,
            Key: key,
        };

        const deleteCommand = new DeleteObjectCommand(deleteParams);

        try {
            const response = await this.s3Client.send(deleteCommand);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
}
