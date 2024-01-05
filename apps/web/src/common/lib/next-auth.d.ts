import NextAuth from 'next-auth';
import { InferSelectModel } from '@chirp/db/drizzle-orm';
import * as schema from '@chirp/db';

declare module 'next-auth' {
    interface Session {
        user: User;
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}

import { JWT } from 'next-auth/jwt';
import { User } from '../typings/user';

declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}
