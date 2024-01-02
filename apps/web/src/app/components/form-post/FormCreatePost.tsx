'use client';
import { useFormPost } from '@/app/context/FormPostProvider';
import UserAvatar from '@/common/components/elements/UserAvatar';
import { Button } from '@/common/components/ui/button';
import { useAuthStore } from '@chirp/zustand';
import { ChangeEvent, FormEvent } from 'react';
import InputImage from './InputImage';
import { useCreatePostMutation } from '@chirp/api';
import FormPreviewImage from './FormPreviewImage';

export default function FormCreatePost() {
    const user = useAuthStore((state) => state.user);

    const {
        filesInputState,
        setFilesInputState,
        filesURL,
        setFilesURL,
        contentState,
        setContentState,
    } = useFormPost();

    const { mutate } = useCreatePostMutation();

    const handlePostSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({
            authorId: user?.id!,
            content: contentState,
            images: filesInputState,
        });
    };

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContentState(e.target.value);
    };

    const handlerRemoveMedia = (idx: number) => {
        const updatedInputFiles = filesInputState.filter(
            (_, id, __) => id !== idx
        );
        setFilesInputState(updatedInputFiles);
    };
    return (
        <>
            {!user ? null : (
                <section className="border-b">
                    <div className="flex p-4 gap-x-4 h-full">
                        <div className="w-[2.5rem]">
                            <UserAvatar
                                src={user?.image}
                                fallback="..."
                                className="w-full h-full"
                            />
                        </div>

                        <form
                            className="grow space-y-2"
                            encType="multipart/form-data"
                            onSubmit={handlePostSubmit}
                        >
                            <textarea
                                className="w-full bg-transparent resize-none outline-none py-2"
                                rows={1}
                                maxLength={280}
                                name="content"
                                id="content"
                                value={contentState}
                                onChange={handleTextAreaChange}
                                placeholder="What's on your mind?"
                            />
                            {filesURL.length > 0 ? (
                                <FormPreviewImage
                                    previewSource={filesURL}
                                    removeAction={handlerRemoveMedia}
                                />
                            ) : null}
                            <div className="w-full border-t flex justify-between pt-4">
                                <div>
                                    <InputImage
                                        filesInputState={filesInputState}
                                        setFilesInputState={setFilesInputState}
                                        filesURL={filesURL}
                                        setFilesURL={setFilesURL}
                                    />
                                </div>
                                <div>
                                    <Button
                                        className="font-semibold rounded-full bg-sky-500 hover:bg-sky-600 text-white"
                                        type="submit"
                                    >
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
}
