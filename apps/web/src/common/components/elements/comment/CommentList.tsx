import Comment from './Comment';
import { Post } from '@chirp/api';

type CommentListProps = {
    comments: Post['data']['comments'];
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
