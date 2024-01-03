'use client';
import { PostPromise, useGetPostByIdQuery } from '@chirp/api';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

export type PostDetailContextOptions = UseQueryResult<PostPromise, unknown>;

const PostDetailContext = React.createContext<PostDetailContextOptions | null>(
    null
);

export const PostDetailProvider: React.FC<
    React.PropsWithChildren<{ postId: string }>
> = ({ postId, children }) => {
    const postQueryResult = useGetPostByIdQuery(postId);

    return (
        <PostDetailContext.Provider value={postQueryResult}>
            {children}
        </PostDetailContext.Provider>
    );
};

export const usePostDetail = () => {
    const context = React.useContext(PostDetailContext);

    if (!context)
        throw new Error('useFormPost must be used within FormPostProvider');
    return context;
};
