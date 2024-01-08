'use client';

import { PostLoading, PostOptions } from '@/common/components/elements/post';
import UserAvatar from '@/common/components/elements/UserAvatar';

import { usePostDetailContext } from '../context/PostDetailProvider';
import PostDetailImage from './PostDetailImages';

export default function PostDetail() {
    const { data } = usePostDetailContext();

    if (!data) return <PostLoading />;
    return (
        <article className="flex flex-col gap-4 border-b p-4">
            <header className="flex justify-between">
                <div className="flex items-center gap-2 leading-4">
                    <UserAvatar src={data.data.author.avatarUrl} />
                    <div>
                        <h1>{data.data.author.fullName}</h1>
                        <small className="text-muted-foreground">
                            @{data.data.author.username}
                        </small>
                    </div>
                </div>

                <div>
                    <PostOptions
                        authorId={data.data.author.id}
                        postId={data.data.id}
                    />
                </div>
            </header>
            <main className="space-y-2">
                <p className="text-sm text-neutral-200">{data.data.content}</p>
                {data.data.images ? (
                    <PostDetailImage images={data.data.images} />
                ) : null}
            </main>
        </article>
    );
}
