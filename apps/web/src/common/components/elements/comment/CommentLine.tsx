import { cn } from '@/common/lib/utils';
import { MinusCircle, PlusCircle } from 'lucide-react';

type CommentLineProps = {
    isShowChildren: boolean;
    isHaveChildren: boolean;
    commentsNumber?: number;
    setIsShowChildren: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentLine: React.FC<CommentLineProps> = (props) => {
    const {
        isShowChildren,
        setIsShowChildren,
        isHaveChildren,
        commentsNumber,
    } = props;
    return (
        <div
            className={cn(
                'flex  w-[40px] justify-end',
                !isHaveChildren && 'invisible',
            )}
        >
            <div
                className={cn(
                    'relative h-[calc(100%+0.9rem)] w-1/2 rounded-bl-xl border-b border-l transition-all duration-300 ease-linear',
                    {
                        // parent off
                        'rounded-bl-none border-b-transparent': !isShowChildren,
                    },
                )}
            >
                <span className="absolute bottom-0 right-0 w-max translate-x-[100%] translate-y-1/2 px-2 text-xs text-muted-foreground">
                    {commentsNumber} more replies
                </span>
                {!isShowChildren ? (
                    <PlusCircle
                        className={cn(
                            'easel absolute bottom-0 left-0 z-50 translate-x-2/3 translate-y-1/2 cursor-pointer transition-all duration-300 ease-linear',
                            {
                                '-translate-x-1/2': !isShowChildren,
                            },
                        )}
                        size={13}
                        onClick={() => setIsShowChildren(!isShowChildren)}
                    />
                ) : (
                    <MinusCircle
                        className={cn(
                            'easel absolute bottom-0 left-0 z-50 translate-x-2/3 translate-y-1/2 cursor-pointer transition-all duration-300 ease-linear',
                            {
                                '-translate-x-1/2': !isShowChildren,
                            },
                        )}
                        size={13}
                        onClick={() => setIsShowChildren(!isShowChildren)}
                    />
                )}
            </div>
        </div>
    );
};

export default CommentLine;
