import React from 'react';

import Comment from '../comment/Form/CommentFormModal';
import Like from '../like/Like';
import { UseToggleLike } from '../like/hooks/useToggleLike';

export type PostActionsProps = {
    post: UseToggleLike & {
        commentsNumber: number;
    };
};

const PostActions: React.FC<PostActionsProps> = (props) => {
    return (
        <div className="flex items-center gap-1.5">
            {/* Likes */}
            <Like post={props.post} />
            {/* Comments */}
            <Comment
                comment={{
                    postId: props.post.id,
                    repliesNumber: props.post.commentsNumber,
                }}
            />
        </div>
    );
};

export default PostActions;
