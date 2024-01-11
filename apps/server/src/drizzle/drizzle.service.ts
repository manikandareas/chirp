import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { config } from '~/config';
import * as schema from '@chirp/db';

@Injectable()
export class DrizzleService {
    private db: NeonHttpDatabase<typeof schema>;

    constructor() {
        this.connect();
    }
    private async connect() {
        neonConfig.fetchConnectionCache = true;

        const sql = neon(config.databaseUri!);
        this.db = drizzle(sql, { schema });
    }

    public getDb(): NeonHttpDatabase<typeof schema> {
        return this.db;
    }
}
