'use client';

import Link from 'next/link';
import UserAvatar from '@/common/components/elements/UserAvatar';
import PostOptions from '@/common/components/elements/post/PostOptions';
import PostLoading from '@/common/components/elements/post/PostLoading';

import { usePostDetail } from '../context/PostDetailProvider';
import PostDetailImage from './PostDetailImages';

export default function PostDetail() {
    const { data } = usePostDetail();

    if (!data) return <PostLoading />;
    return (
        <article className="flex flex-col gap-4 border-b p-4">
            <header className="flex justify-between">
                <div className="flex gap-2 items-center leading-4">
                    <UserAvatar src={data.data.author.avatarUrl} />
                    <div>
                        <h1>{data.data.author.fullName}</h1>
                        <small className="text-muted-foreground">
                            @{data.data.author.username}
                        </small>
                    </div>
                </div>

                <div>
                    <PostOptions postId={data.data.id} />
                </div>
            </header>
            <main className="space-y-2">
                <p className="text-neutral-200 text-sm">{data.data.content}</p>
                {data.data.images ? (
                    <PostDetailImage images={data.data.images} />
                ) : null}
            </main>
        </article>
    );
}
