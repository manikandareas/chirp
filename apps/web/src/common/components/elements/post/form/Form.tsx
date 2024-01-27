import React, { FormEvent } from 'react';
import { useAuthStore } from '@chirp/zustand';

import { FormPreviewImage, FormRibbonMenu, useFormPostContext } from '.';
import { Button } from '@/common/components/ui/button';
import Loading from '@/common/components/ui/loading';
import UserAvatar from '@/common/components/elements/UserAvatar';
import GrowingTextArea from '@/common/components/ui/GrowingTextArea';

type FormProps = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isPending: boolean;
    type: 'comment' | 'post';
};

const formVariants = {
    comment: {
        placeholder: 'Post your reply',
        submit: ['Reply', 'Replying...'],
    },
    post: {
        placeholder: "What's on your mind?",
        submit: ['Post', 'Posting...'],
    },
} as const;

const Form: React.FC<FormProps> = ({ isPending, onSubmit, type }) => {
    const user = useAuthStore((state) => state.user);

    const {
        filesInputState,
        setFilesInputState,
        filesURL,
        contentState,
        textAreaRef,
        setContentState,
    } = useFormPostContext();

    const handlerRemoveMedia = (idx: number) => {
        const updatedInputFiles = filesInputState.filter((_, id) => id !== idx);
        setFilesInputState(updatedInputFiles);
    };
    return (
        <>
            {!user ? null : (
                <section className="border-b">
                    <div className="flex h-full gap-x-4 p-4">
                        <div className="w-[2.5rem]">
                            <UserAvatar
                                src={user?.avatarUrl}
                                fallback="..."
                                className="h-10 w-10"
                            />
                        </div>

                        <form
                            className="grow space-y-2"
                            encType="multipart/form-data"
                            onSubmit={onSubmit}
                        >
                            <GrowingTextArea
                                setState={setContentState}
                                state={contentState}
                                textAreaRef={textAreaRef}
                                placeholder={formVariants[type].placeholder}
                            />
                            {filesURL.length > 0 ? (
                                <FormPreviewImage
                                    previewSource={filesURL}
                                    removeAction={handlerRemoveMedia}
                                />
                            ) : null}
                            <div className="flex w-full justify-between border-t pt-4">
                                <FormRibbonMenu />
                                <div>
                                    <Button
                                        className="rounded-full bg-primary font-semibold text-white hover:bg-primary/90"
                                        type="submit"
                                        disabled={
                                            isPending ||
                                            contentState.length <= 3
                                        }
                                    >
                                        {!isPending ? (
                                            formVariants[type].submit[0]
                                        ) : (
                                            <span className="flex items-center">
                                                <Loading />
                                                {formVariants[type].submit[1]}
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
};

export default Form;
