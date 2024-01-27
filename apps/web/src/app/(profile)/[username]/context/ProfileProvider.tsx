'use client';

import { UserProfile, useGetProfileByUsernameQuery } from '@chirp/api';
import { UseQueryResult } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import React from 'react';

export type ProfileUserQuery = UseQueryResult<UserProfile, unknown>;

const ProfileUserContext = React.createContext<ProfileUserQuery | null>(null);

export const ProfileUserProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const params: { username: string } = useParams();
    const userQueryResult = useGetProfileByUsernameQuery(params.username);

    if (userQueryResult.isError) {
        notFound();
    }

    return (
        <ProfileUserContext.Provider value={userQueryResult}>
            {children}
        </ProfileUserContext.Provider>
    );
};

export const useProfileUserContext = () => {
    const context = React.useContext(ProfileUserContext);
    if (!context)
        throw new Error(
            'useProfileUser must be used within ProfileUserProvider',
        );
    return context;
};
