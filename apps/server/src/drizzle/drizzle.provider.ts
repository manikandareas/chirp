import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { config } from 'src/config';

/**
 * Provider key used for dependency injection to provide the Drizzle ORM instance asynchronously.
 * Consumers can use this key to inject the Drizzle ORM instance into their components or services.
 */
export const DrizzleAsyncProvider = 'drizzleProvider';

/**
 * Asynchronous provider configuration for the Drizzle ORM instance.
 *
 * @remarks
 * This provider is responsible for creating and exporting the Drizzle ORM instance based on the specified configuration.
 * It uses the `createClient` function to establish a connection to the database with the provided URL and authentication token.
 * The Drizzle ORM instance is then created using the established client and the provided database schema.
 *
 * @returns An array of provider configuration objects, including the Drizzle ORM instance.
 */
export const drizzleProvider = [
    {
        provide: DrizzleAsyncProvider,
        useFactory: async () => {
            const client = createClient({
                url: config.databaseUri,
                authToken: config.databaseAuthToken,
            });
            const db = drizzle(client, { schema });
            return db;
        },
        exports: [DrizzleAsyncProvider],
    },
];
