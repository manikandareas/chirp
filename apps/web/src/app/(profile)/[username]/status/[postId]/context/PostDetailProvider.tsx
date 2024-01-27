'use client';

import React from 'react';
import { Post, useGetPostByIdQuery } from '@chirp/api';
import { UseQueryResult } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

export type PostDetailContextOptions = UseQueryResult<Post, unknown>;

const PostDetailContext = React.createContext<PostDetailContextOptions | null>(
    null,
);

export const PostDetailProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const params: { postId: string } = useParams();
    const postQueryResult = useGetPostByIdQuery(params.postId);

    if (postQueryResult.isError) {
        notFound();
    }

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
