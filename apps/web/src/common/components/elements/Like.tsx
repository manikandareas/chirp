import { cn } from '@/common/lib/utils';
import { Heart } from 'lucide-react';

type LikeProps = {
    onLikePress: () => void;
    likes: number;
    isUserLiked: boolean;
};

const Like: React.FC<LikeProps> = (props) => {
    return (
        <button
            className="group/like flex items-center text-neutral-300"
            type="button"
            onClick={props.onLikePress}
        >
            <i
                className={cn(
                    ' rounded-full p-1.5 group-hover/like:bg-rose-500/20',
                )}
            >
                <Heart
                    size={18}
                    className={cn(' group-hover/like:text-rose-500', {
                        'fill-rose-500 text-rose-500': props.isUserLiked,
                    })}
                />
            </i>
            <span
                className={cn('text-xs group-hover/like:text-rose-500', {
                    'text-rose-500': props.isUserLiked,
                })}
            >
                {props.likes}
            </span>
        </button>
    );
};

export default Like;
