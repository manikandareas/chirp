import { intlFormatDistance } from 'date-fns';
import PopupInformationForUser from '../PopupInformationForUser';

type CommentHeaderProps = {
    author: {
        fullName: string;
        username: string;
        avatarUrl: string;
    };
    createdAt: string;
};

const CommentHeader: React.FC<CommentHeaderProps> = (props) => {
    const localeDate = new Date(props.createdAt);
    const relativeDate = intlFormatDistance(localeDate, new Date());
    return (
        <div className="flex grow gap-2 px-4 pt-4">
            <PopupInformationForUser.WithAvatar {...props.author} />
            <div className="flex items-center gap-x-1">
                <h1 className="text-sm">{props.author?.fullName}</h1>
                <small className="font-light text-muted-foreground">
                    • @{props.author?.username}
                </small>

                <small className="font-light text-muted-foreground">
                    • {relativeDate}
                </small>
            </div>
        </div>
    );
};

export default CommentHeader;
