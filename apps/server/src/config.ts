import { get } from 'env-var';

import { loadEnv } from './env';

/**
 * Loads environment variables from the system environment or a .env file.
 * This function must be called before accessing any configuration values.
 */
loadEnv();

/**
 * Retrieves the value of the specified environment variable and marks it as required.
 *
 * @param env - The name of the environment variable to retrieve.
 * @returns The value of the specified environment variable as a string.
 */
export const getRequired = (env: string) => get(env).required();

export const getOptional = (env: string) => get(env).default('');

/**
 * Configuration object containing various properties for the application settings.
 */
export const config = {
    /**
     * Retrieves the required value of the 'DATABASE_URL' environment variable as a string.
     */
    get databaseUri() {
        return getRequired('DATABASE_URL').asString();
    },

    /**
     * Retrieves the required value of the 'DATABASE_AUTH_TOKEN' environment variable as a string.
     */
    get databaseAuthToken() {
        return getRequired('DATABASE_AUTH_TOKEN').asString();
    },

    /**
     * Retrieves the required value of the 'CLIENT_LOCAL_URL' environment variable as a string.
     */
    get clientLocalUrl() {
        return getRequired('CLIENT_LOCAL_URL').asString();
    },

    /**
     * Retrieves the required value of the 'SERVER_PORT' environment variable as a port number.
     */
    get serverPort() {
        return getRequired('SERVER_PORT').asPortNumber();
    },

    /**
     * Retrieves the required value of the 'JWT_SECRET_KEY' environment variable as a string.
     */
    get jwtSecretKey() {
        return getRequired('JWT_SECRET_KEY').asString();
    },

    /**
     * Retrieves the required value of the 'JWT_REFRESH_TOKEN_KEY' environment variable as a string.
     */
    get jwtRefreshTokenKey() {
        return getRequired('JWT_REFRESH_TOKEN_KEY').asString();
    },

    /**
     * Retrieves the required value of the 'AWS_BUCKET_NAME' environment variable as a string.
     */
    get awsBucketName() {
        return getOptional('AWS_BUCKET_NAME').asString();
    },

    /**
     * Retrieves the required value of the 'AWS_REGION' environment variable as a string.
     */
    get awsS3Region() {
        return getOptional('AWS_S3_REGION').asString();
    },

    /**
     * Retrieves the required value of the 'AWS_ACCESS_KEY_ID' environment variable as a string.
     */
    get awsAccessKeyId() {
        return getOptional('AWS_ACCESS_KEY_ID').asString();
    },

    /**
     * Retrieves the required value of the 'AWS_SECRET_ACCESS_KEY' environment variable as a string.
     */
    get awsSecretAccessKey() {
        return getOptional('AWS_SECRET_ACCESS_KEY').asString();
    },
};
