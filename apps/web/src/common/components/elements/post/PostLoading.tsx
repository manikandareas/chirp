import { Skeleton } from '../../ui/skeleton';

export default function PostLoading() {
    return (
        <article className="flex h-fit w-full flex-col gap-4 border p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
                <Skeleton className="h-2 w-6 rounded-sm" />
            </div>
            <div className="space-y-1">
                <Skeleton className="h-4 w-[80%] md:w-[30rem]" />
                <Skeleton className="h-4 w-[75%] md:w-[28rem]" />
                <Skeleton className="h-4 w-[70%] md:w-[27rem]" />
                <Skeleton className="h-4 w-[75%] md:w-[28rem]" />
                <Skeleton className="h-4 w-[60%] md:w-[26rem]" />
            </div>
            <div className="flex gap-4">
                {Array(4)
                    .fill(0)
                    .map((_, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                            <Skeleton className="h-[20px] w-[20px] rounded-full" />
                            <Skeleton className="h-3 w-[24px]" />
                        </div>
                    ))}
            </div>
        </article>
    );
}

const PostsLoading: React.FC<{ length?: number }> = ({ length = 6 }) => {
    return (
        <>
            {Array(length)
                .fill(0)
                .map((_, idx) => (
                    <PostLoading key={idx} />
                ))}
        </>
    );
};

PostLoading.Many = PostsLoading;
