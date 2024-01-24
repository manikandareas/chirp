import { cn } from '@/common/lib/utils';
import { Heart } from 'lucide-react';
import { useToggleLike } from './hooks/useToggleLike';

type LikeProps = {
    post: {
        totalLikes: number;
        isUserLiked: boolean;
        id: string;
    };
};

const Like: React.FC<LikeProps> = (props) => {
    const { likes, onLikePress, isUserLiked } = useToggleLike(props.post);
    return (
        <button
            className="group/like flex items-center text-neutral-300"
            type="button"
            onClick={onLikePress}
        >
            <i
                className={cn(
                    ' rounded-full p-1.5 group-hover/like:bg-rose-500/20',
                )}
            >
                <Heart
                    size={18}
                    className={cn(' group-hover/like:text-rose-500', {
                        'fill-rose-500 text-rose-500': isUserLiked,
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
    );
};

export default Like;
