'use client';
// import { PostOptions } from '../post';
import CommentList from './CommentList';
import { ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import CommentFormModal from './Form/CommentFormModal';
import { Post } from '@chirp/api';
import CommentLine from './CommentLine';
import CommentHeader from './CommentHeader';

type CommentProps = {
    comment: Post['data']['comments'][number];
};

const Comment: React.FC<CommentProps> = (props) => {
    const [isShowChildren, setIsShowChildren] = useState<boolean>(false);

    const isChild = !!props.comment.parentId;
    const isHaveChildren = !!props.comment.replies?.length;
    return (
        <>
            <div className="relative flex flex-col">
                <CommentHeader
                    author={props.comment.author}
                    createdAt={props.comment.createdAt}
                />

                <div className="flex gap-2 px-4">
                    <CommentLine
                        commentsNumber={props.comment.replies?.length}
                        isHaveChildren={isHaveChildren}
                        isShowChildren={isShowChildren}
                        setIsShowChildren={setIsShowChildren}
                    />
                    <div className="flex-1 space-y-2">
                        <div>
                            <p className="text-sm">{props.comment.message}</p>
                            {isChild && (
                                <span className="text-xs text-muted-foreground">
                                    reply for @
                                    {props.comment.parent?.author.username}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <ThumbsUp size={18} />
                            <CommentFormModal
                                comment={props.comment}
                                setIsShowChildren={setIsShowChildren}
                            />
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
