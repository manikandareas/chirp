'use client';

import Post from '@/common/components/elements/post';
import PostLoading from '@/common/components/elements/post/PostLoading';
import { useGetPostsQuery } from '@chirp/api';

export default function PostFeed() {
    const { data, isLoading } = useGetPostsQuery();
    return (
        <>
            {!isLoading
                ? data?.data.data.map((post) => (
                      <Post key={post.id} {...post} />
                  ))
                : Array(6)
                      .fill(0)
                      .map((_, idx) => <PostLoading key={idx} />)}
        </>
    );
}
