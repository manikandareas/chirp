import * as schema from '@chirp/db';
import { InferSelectModel } from '@chirp/db/drizzle-orm';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { User } from '../typings/user';

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
