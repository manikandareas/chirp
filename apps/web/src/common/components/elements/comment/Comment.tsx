'use client';
import { TComments } from '@/common/constant/comments';
// import PopupInformationForUser from '../PopupInformationForUser';
import { intlFormatDistance } from 'date-fns';
import UserAvatar from '../UserAvatar';
// import { PostOptions } from '../post';
import CommentList from './CommentList';
import { MinusCircle, PlusCircle, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import CommentFormModal from './Form/CommentFormModal';
import { cn } from '@/common/lib/utils';

type CommentProps = {
    comment: TComments[number];
};

const Comment: React.FC<CommentProps> = (props) => {
    // const DETAIL_POST_URL = `/${props.comment.author.username}/status/${props.post.id}`;
    // const PROFILE_URL = `/${props.comment.author.username}`;

    const localeDate = new Date(props.comment.createdAt);
    const relativeDate = intlFormatDistance(localeDate, new Date());

    const [isShowChildren, setIsShowChildren] = useState<boolean>(false);

    const isChild = !!props.comment.parentId;
    const isHaveChildren = !!props.comment.replies.length;
    return (
        <>
            <div className="relative flex flex-col">
                <div className="flex gap-2 px-4 pt-4">
                    <div className="">
                        <UserAvatar src={props.comment.author.avatarUrl} />
                    </div>

                    <div className="flex items-center gap-x-1">
                        <h1>{props.comment.author.username}</h1>
                        <small className="font-light text-muted-foreground">
                            • @{props.comment.author.username}
                        </small>

                        <small className="font-light text-muted-foreground">
                            • {relativeDate}
                        </small>
                    </div>
                </div>

                <div className="flex gap-2 px-4">
                    <div
                        className={cn(
                            'flex  w-[40px] justify-end',
                            !isHaveChildren && 'invisible',
                        )}
                    >
                        <div
                            className={cn(
                                'relative h-[calc(100%+0.9rem)] w-1/2 rounded-bl-xl border-b border-l transition-all ease-linear',
                                {
                                    // parent off
                                    'rounded-bl-none border-b-transparent':
                                        !isChild && !isShowChildren,
                                },
                            )}
                        >
                            <span className="absolute bottom-0 right-0 w-max translate-x-[100%] translate-y-1/2 px-2 text-xs text-muted-foreground">
                                {props.comment.replies.length} more replies
                            </span>
                            {!isShowChildren ? (
                                <PlusCircle
                                    className={cn(
                                        'easel absolute bottom-0 left-0 z-50 translate-x-2/3 translate-y-1/2 cursor-pointer transition-all',
                                        {
                                            '-translate-x-1/2':
                                                !isChild && !isShowChildren,
                                        },
                                    )}
                                    size={13}
                                    onClick={() =>
                                        setIsShowChildren(!isShowChildren)
                                    }
                                />
                            ) : (
                                <MinusCircle
                                    className={cn(
                                        'easel absolute bottom-0 left-0 z-50 translate-x-2/3 translate-y-1/2 cursor-pointer transition-all',
                                        {
                                            '-translate-x-1/2':
                                                !isChild && !isShowChildren,
                                        },
                                    )}
                                    size={13}
                                    onClick={() =>
                                        setIsShowChildren(!isShowChildren)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div>
                            <p className="text-sm">{props.comment.message}</p>
                            {isChild && (
                                <span className="text-xs text-muted-foreground">
                                    reply for @manikxixi
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <ThumbsUp size={18} />
                            <span className="flex items-center gap-2">
                                <CommentFormModal comment={props.comment} />
                                <small>
                                    {isHaveChildren
                                        ? props.comment.replies.length
                                        : 0}
                                </small>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {isShowChildren && (
                <div
                    className="px-10"
                    data-aos="zoom-in-up"
                    data-aos-once="true"
                >
                    {props.comment.replies && (
                        <CommentList comments={props.comment.replies} />
                    )}
                </div>
            )}
        </>
    );
};

export default Comment;
