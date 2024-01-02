import { cn } from '@/common/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type UserAvatarProps = {
    src: string | null;
    fallback: string;
    className?: string;
    name?: string;
};

export default function UserAvatar(props: UserAvatarProps) {
    return (
        <Avatar>
            <AvatarImage
                className={cn(props.className)}
                src={
                    props.src ??
                    `https://ui-avatars.com/api/?name=${props.name}`
                }
            />
            <AvatarFallback>{props.fallback}</AvatarFallback>
        </Avatar>
    );
}
