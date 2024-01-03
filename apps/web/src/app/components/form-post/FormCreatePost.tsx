'use client';
import { useFormPost } from '@/app/context/FormPostProvider';
import UserAvatar from '@/common/components/elements/UserAvatar';
import { Button } from '@/common/components/ui/button';
import { useAuthStore } from '@chirp/zustand';
import { FormEvent } from 'react';
import { useCreatePostMutation } from '@chirp/api';
import FormPreviewImage from './FormPreviewImage';
import TextArea from './TextArea';
import RiibbonMenu from './RibbonMenu';
import { toast } from 'sonner';
import Loading from '@/common/components/ui/loading';
import { queryClient } from '@/common/components/provider/ReactQueryProvider';

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
                'Oops! Unable to create post at the moment. Please review your content and try again. If issues persist, reach out to our support team. Thanks for your understanding!'
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
                                src={user?.avatarUrl}
                                fallback="..."
                                className="w-full h-full"
                            />
                        </div>

                        <form
                            className="grow space-y-2"
                            encType="multipart/form-data"
                            onSubmit={handlePostSubmit}
                        >
                            <TextArea />
                            {filesURL.length > 0 ? (
                                <FormPreviewImage
                                    previewSource={filesURL}
                                    removeAction={handlerRemoveMedia}
                                />
                            ) : null}
                            <div className="w-full border-t flex justify-between pt-4">
                                <RiibbonMenu />
                                <div>
                                    <Button
                                        className="font-semibold rounded-full bg-sky-500 hover:bg-sky-600 text-white"
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
