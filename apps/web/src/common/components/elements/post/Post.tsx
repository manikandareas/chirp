'use client';

import Link from 'next/link';
import { PostPromise } from '@chirp/api';
import { intlFormatDistance } from 'date-fns';

import PopupInformationForUser from '../PopupInformationForUser';
import UserAvatar from '../UserAvatar';
import PostActions from './PostActions';
import PostImage from './PostImages';
import PostOptions from './PostOptions';

export type PostProps = {
    post: PostPromise['data'];
};
export default function Post(props: PostProps) {
    const DETAIL_POST_URL = `/${props.post.author.username}/status/${props.post.id}`;
    const PROFILE_URL = `/${props.post.author.username}`;

    const localeDate = new Date(props.post.createdAt);
    const relativeDate = intlFormatDistance(localeDate, new Date());

    return (
        <article className="flex flex-col gap-4 border-b p-4">
            <header className="flex justify-between">
                <Link href={PROFILE_URL}>
                    <div className="flex items-center gap-2 leading-4">
                        <PopupInformationForUser {...props.post.author}>
                            <UserAvatar src={props.post.author.avatarUrl} />
                        </PopupInformationForUser>
                        <div>
                            <h1 className="decoration-2 hover:underline">
                                {props.post.author.fullName}
                            </h1>
                            <small className="text-muted-foreground">
                                @{props.post.author.username}
                            </small>
                        </div>
                    </div>
                </Link>

                <div>
                    <PostOptions post={props.post} />
                </div>
            </header>
            <main>
                <Link href={DETAIL_POST_URL} className="space-y-2">
                    <p className="text-sm text-neutral-200">
                        {props.post.content}
                    </p>
                    {props.post.images ? (
                        <PostImage images={props.post.images} />
                    ) : null}
                </Link>
            </main>
            <footer className="flex items-center justify-between">
                <PostActions post={props.post} />
                <div className="w-full text-right text-xs text-muted-foreground ">
                    <time>{relativeDate}</time>
                </div>
            </footer>
        </article>
    );
}
