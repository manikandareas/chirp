'use client';

import { FormEvent } from 'react';
import { useFormPost } from './context/FormPostProvider';
import UserAvatar from '@/common/components/elements/UserAvatar';
import { queryClient } from '@/common/components/provider/ReactQueryProvider';
import { Button } from '@/common/components/ui/button';
import Loading from '@/common/components/ui/loading';
import { useCreatePostMutation } from '@chirp/api';
import { useAuthStore } from '@chirp/zustand';
import { toast } from 'sonner';

import FormPreviewImage from './FormPreviewImage';
import FormRibbonMenu from './FormRibbonMenu';
import FormTextArea from './FormTextArea';

export default function FormCreatePost() {
    const user = useAuthStore((state) => state.user);

    const {
        filesInputState,
        setFilesInputState,
        filesURL,
        contentState,
        setContentState,
    } = useFormPost();

    const { mutateAsync, isPending } = useCreatePostMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
            toast.success('Great! Your post has been successfully created.');
        },
        onError: () => {
            toast.error(
                'Oops! Unable to create post at the moment. Please review your content and try again. If issues persist, reach out to our support team. Thanks for your understanding!',
            );
        },
        onSettled: () => {
            setFilesInputState([]);
            setContentState('');
        },
    });

    const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await mutateAsync({
            authorId: user?.id!,
            content: contentState,
            images: filesInputState,
        });
    };

    const handlerRemoveMedia = (idx: number) => {
        const updatedInputFiles = filesInputState.filter(
            (_, id, __) => id !== idx,
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
                            onSubmit={handlePostSubmit}
                        >
                            <FormTextArea />
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
                                        className="rounded-full bg-sky-500 font-semibold text-white hover:bg-sky-600"
                                        type="submit"
                                        disabled={isPending}
                                    >
                                        {!isPending ? (
                                            'Post'
                                        ) : (
                                            <span className="flex items-center">
                                                <Loading /> Uploading...
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
}
