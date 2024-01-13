'use client';

import React from 'react';
import { PostPromise, useGetPostByIdQuery } from '@chirp/api';
import { UseQueryResult } from '@tanstack/react-query';

export type PostDetailContextOptions = UseQueryResult<PostPromise, unknown>;

const PostDetailContext = React.createContext<PostDetailContextOptions | null>(
    null,
);

export const PostDetailProvider: React.FC<
    React.PropsWithChildren<{
        postId: string;
    }>
> = ({ postId, children }) => {
    const postQueryResult = useGetPostByIdQuery(postId);

    return (
        <PostDetailContext.Provider value={postQueryResult}>
            {children}
        </PostDetailContext.Provider>
    );
};

export const usePostDetailContext = () => {
    const context = React.useContext(PostDetailContext);

    if (!context)
        throw new Error('usePostDetail must be used within PostDetailProvider');
    return context;
};
