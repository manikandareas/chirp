import { Heart, MessageCircle } from 'lucide-react';
import React from 'react';
import { PostProps } from './Post';
import { useLikeService } from './services/likeService';
import { cn } from '@/common/lib/utils';

type PostActionsProps = {
    post: PostProps['post'];
};

const ICON_SIZE = 18;

const PostActions: React.FC<PostActionsProps> = (props) => {
    const { likes, onLikePress, isUserLiked } = useLikeService(props.post);
    return (
        <div className="flex items-center gap-1.5">
            {/* Likes */}
            <button
                className="group/like flex items-center text-neutral-300"
                type="button"
                onClick={onLikePress}
            >
                <i
                    className={cn(
                        'rounded-full p-1.5 group-hover/like:bg-rose-500/20',
                        { 'bg-rose-500/20': isUserLiked },
                    )}
                >
                    <Heart
                        size={ICON_SIZE}
                        className={cn('group-hover/like:text-rose-500', {
                            'text-rose-500': isUserLiked,
                        })}
                    />
                </i>
                <span
                    className={cn('text-xs group-hover/like:text-rose-500', {
                        'text-rose-500': isUserLiked,
                    })}
                >
                    {likes}
                </span>
            </button>
            {/* Comments */}
            <button className="group/like flex items-center text-neutral-300">
                <i className="rounded-full p-1.5 group-hover/like:bg-sky-500/20">
                    <MessageCircle
                        size={ICON_SIZE}
                        className="group-hover/like:text-sky-500"
                    />
                </i>
                <span className="text-xs group-hover/like:text-sky-500">
                    512
                </span>
            </button>
        </div>
    );
};

export default PostActions;
