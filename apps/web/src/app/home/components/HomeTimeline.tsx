'use client';

import { Post, PostLoading } from '@/common/components/elements/post';
import { useGetPostsQuery } from '@chirp/api';

export default function HomeTimeline() {
    const { data, isLoading } = useGetPostsQuery();
    return (
        <>
            {!isLoading
                ? data?.data.data.map((post) => (
                      <Post key={post.id} post={post} asLink={true} />
                  ))
                : Array(6)
                      .fill(0)
                      .map((_, idx) => <PostLoading key={idx} />)}
        </>
    );
}
