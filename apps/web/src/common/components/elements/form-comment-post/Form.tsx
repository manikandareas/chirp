import React, { FormEvent } from 'react';
import { useAuthStore } from '@chirp/zustand';

import {
    FormPreviewImage,
    FormRibbonMenu,
    FormTextArea,
    useFormCommentPostContext,
} from '.';
import { Button } from '../../ui/button';
import Loading from '../../ui/loading';
import UserAvatar from '../UserAvatar';

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

    const { filesInputState, setFilesInputState, filesURL } =
        useFormCommentPostContext();

    const handlerRemoveMedia = (idx: number) => {
        const updatedInputFiles = filesInputState.filter(
            (_, id) => id !== idx,
        );
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
                            <FormTextArea
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
                                        disabled={isPending}
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
