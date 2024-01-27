import { Skeleton } from '@/common/components/ui/skeleton';

const ProfileLoading: React.FC = () => {
    return (
        <div className="relative min-h-[25rem]">
            {/* Cover Image */}
            <Skeleton className="relative aspect-[16/5] max-h-[12.5rem] w-full">
                {/* Avatar */}
                <Skeleton className="absolute bottom-0 left-4  aspect-square w-28 translate-y-1/2 rounded-full border-[3px] border-background sm:w-32" />
            </Skeleton>
            {/* User Profile */}
            <div className="w-full space-y-4 px-4 py-3">
                {/* Button Action */}
                {/* <div className="flex justify-end gap-x-2">
                    <Skeleton className="rounded-full p-2">
                        <MoreHorizontal size={18} />
                    </Skeleton>
                    <Skeleton className="rounded-full p-2">
                        <Mail size={18} />
                    </Skeleton>
                    <Skeleton className="rounded-full p-2">Follow</Skeleton>
                </div> */}
                {/* Detail User */}
                <div className="h-16"></div>
                <div className="space-y-2">
                    <div className="space-y-1">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-2 w-20" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-3 w-[80%]" />
                        <Skeleton className="h-3 w-[78%]" />
                        <Skeleton className="h-3 w-[10%]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLoading;
