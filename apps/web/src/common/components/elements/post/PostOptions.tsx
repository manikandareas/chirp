import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import PostRemoveModal from './PostRemoveModal';
export default function PostOptions({ postId }: { postId: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <PostRemoveModal id={postId} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
