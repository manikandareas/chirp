import { TComments } from '@/common/constant/comments';
import Comment from './Comment';

type CommentListProps = {
    comments: TComments;
};

const CommentList: React.FC<CommentListProps> = (props) => {
    return (
        <div className="space-y-4">
            {props.comments?.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
