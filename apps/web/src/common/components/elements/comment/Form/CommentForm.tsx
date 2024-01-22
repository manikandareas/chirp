'use client';
import { useAuthStore } from '@chirp/zustand';
import PopupInformationForUser from '../../PopupInformationForUser';
import UserAvatar from '../../UserAvatar';
import GrowingTextArea from '@/common/components/ui/GrowingTextArea';
import { ElementRef, useRef, useState } from 'react';
import { Separator } from '@/common/components/ui/separator';
import { Button } from '@/common/components/ui/button';
import InputEmoji from '../../InputEmoji';

type CommentFormProps = {};
const CommentForm: React.FC<CommentFormProps> = () => {
    const user = useAuthStore((state) => state.user);
    const textAreaRef = useRef<ElementRef<'textarea'>>(null);
    const [content, setContent] = useState<string>('');

    const handlerInputEmoji = (e: string) => {
        setContent(content + e);
    };

    if (!user) return <h1>Loading...</h1>;

    return (
        <form className="  flex items-center border-b">
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
                    <Button size={'sm'} className="rounded-full" type="button">
                        Comment
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
