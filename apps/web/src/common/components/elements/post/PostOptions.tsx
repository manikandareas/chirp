import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import { useAuthStore } from '@chirp/zustand';
import { MoreHorizontal } from 'lucide-react';

import PostRemoveModal from './PostRemoveModal';
import PostUpdateModal from './PostUpdateModal';
import { PostProps } from './Post';

type PostOptionsProps = PostProps;

const PostOptions: React.FC<PostOptionsProps> = ({ post }) => {
    const { user } = useAuthStore();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-2 p-2 font-light">
                {user?.id === post?.author.id ? (
                    <>
                        <DropdownMenuItem asChild>
                            <PostRemoveModal postId={post.id} />
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <PostUpdateModal post={post} />
                        </DropdownMenuItem>
                    </>
                ) : null}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default PostOptions;
