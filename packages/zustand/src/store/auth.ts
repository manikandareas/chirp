import * as schema from '@chirp/db';
/*
 * Getting library from @chirp/db pacakage
 */
import { InferSelectModel } from 'drizzle-orm';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/*
 * Getting type from @chirp/db schema
 */

export type User = Omit<InferSelectModel<typeof schema.users>, 'password'>;

export type BackendTokens = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number | null;
};

export type AuthSlice = {
    user: User | null;
    backendTokens: BackendTokens | null;
    onSignInSuccess: (
        payload: Omit<AuthSlice, 'onSignInSuccess' | 'onSignOutSuccess'>,
    ) => void;
    onSignOutSuccess: () => void;
};

export const useAuthStore = create<AuthSlice>()(
    persist(
        (set, get) => ({
            user: null,
            backendTokens: null,

            onSignInSuccess: ({ user, backendTokens }) =>
                set({
                    user,
                    backendTokens,
                }),
            onSignOutSuccess: () => {
                localStorage.removeItem('chirp-storage');
                return set({
                    user: null,
                    backendTokens: null,
                });
            },
        }),
        {
            name: 'chirp-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
