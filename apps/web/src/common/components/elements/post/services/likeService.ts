'use client';

import { useEffect, useState } from 'react';
import { queryClient } from '@/common/components/provider/ReactQueryProvider';
import { useLikePostMutation } from '@chirp/api';

import { PostProps } from '../Post';

export const useLikeService = (post: PostProps['post']) => {
    const [likes, setLikes] = useState<number>(post.totalLikes);
    const [isUserLiked, setIsUserLiked] = useState<boolean>(post.isUserLiked);

    const { mutateAsync } = useLikePostMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
        },
    });
    const onLikePress = async () => {
        if (isUserLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsUserLiked(!isUserLiked);
        await mutateAsync(post.id);
    };

    useEffect(() => {
        setLikes(post.totalLikes);
        setIsUserLiked(post.isUserLiked);
    }, [post.totalLikes, post.isUserLiked]);

    return {
        onLikePress,
        likes,
        isUserLiked,
    };
};
