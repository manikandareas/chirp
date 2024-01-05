import { cn } from '@/common/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type UserAvatarProps = {
    src: string;
    fallback?: string;
    className?: string;
};

export default function UserAvatar(props: UserAvatarProps) {
    return (
        <Avatar>
            <AvatarImage className={cn(props.className)} src={props.src} />
            <AvatarFallback>{props.fallback ?? '...'}</AvatarFallback>
        </Avatar>
    );
}
