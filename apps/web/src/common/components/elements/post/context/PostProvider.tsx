'use client';

import React from 'react';
import { PostPromise } from '@chirp/api';

type PostContextOptions = PostPromise['data'];

const PostContext = React.createContext<PostContextOptions | null>(null);

export const PostProvider: React.FC<
    React.PropsWithChildren<PostContextOptions>
> = ({ children, ...post }) => {
    return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};

export const usePost = () => {
    const context = React.useContext(PostContext);

    if (!context) throw new Error('usePost must be used within PostProvider');
    return context;
};
