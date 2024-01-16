'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@chirp/zustand';
import { useSession } from 'next-auth/react';

export const AuthListener = () => {
    const { onSignInSuccess, onSignOutSuccess } = useAuthStore((state) => ({
        onSignInSuccess: state.onSignInSuccess,
        onSignOutSuccess: state.onSignOutSuccess,
    }));

    const session = useSession();

    useEffect(() => {
        if (session.status === 'unauthenticated') {
            onSignOutSuccess();
        }

        if (session.status === 'authenticated') {
            onSignInSuccess({
                user: session.data.user,
                backendTokens: session.data.backendTokens,
            });
        }
    }, [session.status]);

    return null;
};
