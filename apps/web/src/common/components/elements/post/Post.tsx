'use client';
import Link from 'next/link';
import { Posts } from '@chirp/api';
import { intlFormatDistance } from 'date-fns';

import PopupInformationForUser from '../PopupInformationForUser';
import PostActions from './PostActions';
import PostOptions from './PostOptions';
import { useRouter } from 'next/navigation';
import { cn } from '@/common/lib/utils';
import PostDetailImage from '@/app/(profile)/[username]/status/[postId]/components/PostDetailImages';

export type PostProps = {
    post: Posts['data'][number];
    asLink?: boolean;
};
export default function Post(props: PostProps) {
    const DETAIL_POST_URL = `/${props.post.author.username}/status/${props.post.id}`;
    const PROFILE_URL = `/${props.post.author.username}`;

    const currentlyDate =
        props.post.updatedAt !== props.post.createdAt
            ? props.post.updatedAt
            : props.post.createdAt;

    const localeDate = new Date(props.post.createdAt);
    const relativeDate = intlFormatDistance(localeDate, new Date());
    const updatedDate = intlFormatDistance(currentlyDate, new Date());

    const router = useRouter();

    const onMainClick = () =>
        props.asLink ? router.push(DETAIL_POST_URL) : null;

    return (
        <article className="flex flex-col gap-4 border-b p-4">
            <header className="flex justify-between">
                <Link href={PROFILE_URL}>
                    <div className="flex items-center gap-2 leading-4">
                        <PopupInformationForUser.WithAvatar
                            {...props.post.author}
                        />
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
            <main className={cn('space-y-2')}>
                <p
                    className={cn('text-sm text-neutral-200', {
                        'cursor-pointer': props.asLink,
                    })}
                    onClick={onMainClick}
                >
                    {props.post.content}{' '}
                </p>
                {props.post.images ? (
                    <PostDetailImage images={props.post.images} />
                ) : null}
            </main>
            <footer className="flex items-center justify-between">
                <PostActions post={props.post} />
                <div className="w-full text-right text-xs text-muted-foreground ">
                    <time>
                        {relativeDate}{' '}
                        <span title={`edited ${updatedDate}`}>
                            {' '}
                            {props.post.updatedAt !== props.post.createdAt &&
                                '(edited)'}
                        </span>
                    </time>
                </div>
            </footer>
        </article>
    );
}
