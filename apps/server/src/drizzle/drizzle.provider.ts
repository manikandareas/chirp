import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { config } from 'src/config';
export const DrizzleAsyncProvider = 'drizzleProvider';

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
