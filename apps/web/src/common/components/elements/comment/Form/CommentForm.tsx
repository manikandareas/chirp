'use client';
import { useAuthStore } from '@chirp/zustand';
import PopupInformationForUser from '../../PopupInformationForUser';
import UserAvatar from '../../UserAvatar';
import GrowingTextArea from '@/common/components/ui/GrowingTextArea';
import { ElementRef, useRef, useState } from 'react';
import { Separator } from '@/common/components/ui/separator';
import { Button } from '@/common/components/ui/button';
import InputEmoji from '../../InputEmoji';
import { useCreateComment } from '../services/commentService';
import { useParams } from 'next/navigation';
import Loading from '@/common/components/ui/loading';

type CommentFormProps = {};

type Params = {
    postId: string;
};
const CommentForm: React.FC<CommentFormProps> = () => {
    const user = useAuthStore((state) => state.user);
    const textAreaRef = useRef<ElementRef<'textarea'>>(null);
    const [content, setContent] = useState<string>('');

    const params: Params = useParams();

    const { onCommentPress, isPending } = useCreateComment(
        {
            message: content,
            postId: params.postId,
        },
        () => {
            setContent('');
        },
    );

    const handlerInputEmoji = (e: string) => {
        setContent(content + e);
    };

    if (!user) return <h1>Loading...</h1>;

    return (
        <form className=" flex items-center border-b">
            <div className="p-4">
                <PopupInformationForUser {...user}>
                    <UserAvatar src={user.avatarUrl} />
                </PopupInformationForUser>
            </div>
            <div className="grow p-4">
                <GrowingTextArea
                    placeholder="Write a comment..."
                    setState={setContent}
                    state={content}
                    textAreaRef={textAreaRef}
                    classNames="text-neutral-300 text-sm "
                />
                <Separator className="w-full" />
                <div className="relative flex w-full items-center justify-between pt-4">
                    <InputEmoji onSelect={handlerInputEmoji} disabled={true} />
                    <Button
                        size={'sm'}
                        className="rounded-full"
                        type="button"
                        onClick={onCommentPress}
                        disabled={isPending || content.length < 4}
                    >
                        {!isPending ? (
                            'Reply'
                        ) : (
                            <span className="flex items-center">
                                <Loading />
                                Replying...
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
