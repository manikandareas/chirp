'use client';

import Link from 'next/link';
import UserAvatar from '../UserAvatar';
import PostImage from './PostImages';
import PostOptions from './PostOptions';
import { PostPromise } from '@chirp/api';
import { intlFormatDistance } from 'date-fns';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/common/components/ui/tooltip';

type PostProps = PostPromise['data'];
export default function Post(props: PostProps) {
    const DETAIL_POST_URL = `/${props.author.username}/status/${props.id}`;
    const PROFILE_URL = `/${props.author.username}`;

    const localeDate = new Date(props.createdAt);
    const relativeDate = intlFormatDistance(localeDate, new Date());

    return (
        <article className="flex flex-col gap-4 border-b p-4">
            <header className="flex justify-between">
                <Link href={PROFILE_URL}>
                    <div className="flex gap-2 items-center leading-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <UserAvatar src={props.author.avatarUrl} />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    {/* TODO */}
                                    <div className="w-[18.75rem]  h-32">
                                        <div className="flex"></div>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div>
                            <h1 className="hover:underline decoration-2">
                                {props.author.fullName}
                            </h1>
                            <small className="text-muted-foreground">
                                @{props.author.username}
                            </small>
                        </div>
                    </div>
                </Link>

                <div>
                    <PostOptions postId={props.id} />
                </div>
            </header>
            <main>
                <Link href={DETAIL_POST_URL} className="space-y-2">
                    <p className="text-neutral-200 text-sm">{props.content}</p>
                    {props.images ? <PostImage images={props.images} /> : null}
                </Link>
            </main>
            <footer>
                <div></div>
                <div className="text-xs text-muted-foreground w-full text-right ">
                    <time>{relativeDate}</time>
                </div>
            </footer>
        </article>
    );
}
