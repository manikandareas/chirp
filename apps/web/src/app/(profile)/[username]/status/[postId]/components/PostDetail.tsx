'use client';

import { PostLoading, PostOptions } from '@/common/components/elements/post';
import PostActions from '@/common/components/elements/post/PostActions';
import UserAvatar from '@/common/components/elements/UserAvatar';
import { intlFormatDistance } from 'date-fns';

import { usePostDetailContext } from '../context/PostDetailProvider';
import PostDetailImage from './PostDetailImages';

import CommentList from '@/common/components/elements/comment/CommentList';
import CommentForm from '@/common/components/elements/comment/Form/CommentForm';

export default function PostDetail() {
    const { data } = usePostDetailContext();

    if (!data) return <PostLoading />;

    const localeDate = new Date(data.data.createdAt);
    const relativeDate = intlFormatDistance(localeDate, new Date());
    return (
        <>
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
                        <PostOptions post={data.data} />
                    </div>
                </header>
                <main className="space-y-2">
                    <p className="text-sm">{data.data.content}</p>
                    {data.data.images ? (
                        <PostDetailImage images={data.data.images} />
                    ) : null}
                </main>
                <footer className="flex items-center justify-between">
                    <PostActions post={data.data} />
                    <div className="w-full text-right text-xs text-muted-foreground ">
                        <time>{relativeDate}</time>
                    </div>
                </footer>
            </article>
            <CommentForm />
            <CommentList comments={data.data.comments} />

            <div className="h-16" />
        </>
    );
}
