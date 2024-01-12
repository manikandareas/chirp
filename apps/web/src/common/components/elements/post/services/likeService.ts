'use client';
import { useEffect, useState } from 'react';
import { PostProps } from '../Post';

export const useLikeService = (post: PostProps['post']) => {
    const [likes, setLikes] = useState<number>(post.totalLikes);
    const [isUserLiked, setIsUserLiked] = useState<boolean>(false);
    const onLikePress = () => {
        if (isUserLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsUserLiked(!isUserLiked);
    };

    useEffect(() => {
        // if(post.){}
    }, []);

    return {
        onLikePress,
        likes,
        isUserLiked,
    };
};
