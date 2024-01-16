import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import { useAuthStore } from '@chirp/zustand';
import { MoreHorizontal } from 'lucide-react';

import { usePost } from './context/PostProvider';
import PostRemoveModal from './PostRemoveModal';

export default function PostOptions({
    postId,
    authorId,
}: {
    postId: string;
    authorId: string;
}) {
    const { user } = useAuthStore();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {user?.id === authorId ? (
                    <DropdownMenuItem asChild>
                        <PostRemoveModal postId={postId} />
                    </DropdownMenuItem>
                ) : null}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
