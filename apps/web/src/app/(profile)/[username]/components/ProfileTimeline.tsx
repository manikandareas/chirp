'use client';

import { Post, PostLoading } from '@/common/components/elements/post';
import { useProfileUserContext } from '../context/ProfileProvider';

export default function ProfileTimeline() {
    const { data: user, isLoading } = useProfileUserContext();

    if (!user?.data || isLoading)
        return (
            <>
                {Array(6)
                    .fill(0)
                    .map((_, idx) => (
                        <PostLoading key={idx} />
                    ))}
            </>
        );

    const { posts, ...data } = user.data;
    const author = {
        id: data.id,
        fullName: data.fullName,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        avatarUrl: data.avatarUrl,
    };
    return (
        <>
            {!isLoading
                ? posts.map((post) => (
                      <Post key={post.id} post={{ ...post, author }} />
                  ))
                : null}
        </>
    );
}
