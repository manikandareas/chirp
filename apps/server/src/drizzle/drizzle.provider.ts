import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from "./schema"
export const DrizzleAsyncProvider = "drizzleProvider"

export const drizzleProvider = [ 
    {
        provide: DrizzleAsyncProvider,
        useFactory: async () => { 
            const client = createClient({ url: process.env.DATABASE_URL as string, authToken: process.env.DATABASE_AUTH_TOKEN as string});
            const db = drizzle(client, {schema});
            return db
        },
        exports: [DrizzleAsyncProvider]
    }
]

