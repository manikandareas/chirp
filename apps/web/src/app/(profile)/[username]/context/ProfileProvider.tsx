'use client';

import { UserProfile, useGetProfileByUsernameQuery } from '@chirp/api';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

export type ProfileUserQuery = UseQueryResult<UserProfile, unknown>;

const ProfileUserContext = React.createContext<ProfileUserQuery | null>(null);

export const ProfileUserProvider: React.FC<
    React.PropsWithChildren<{
        username: string;
    }>
> = ({ username, children }) => {
    const userQueryResult = useGetProfileByUsernameQuery(username);

    if (!userQueryResult.data && !userQueryResult.isLoading) {
        throw new Error('ProfileUserProvider: userQueryResult.data is null');
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
