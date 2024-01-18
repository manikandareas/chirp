'use client';

import { FormEvent } from 'react';
import { queryClient } from '@/common/components/provider/ReactQueryProvider';
import { useCreatePostMutation } from '@chirp/api';
import { useAuthStore } from '@chirp/zustand';
import { toast } from 'sonner';

import { useFormCommentPostContext } from './context/FormCommentPostProvider';
import Form from './Form';

export default function FormCreatePost() {
    const user = useAuthStore((state) => state.user);

    const {
        filesInputState,
        setFilesInputState,
        contentState,
        setContentState,
    } = useFormCommentPostContext();

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
            authorId: user?.id as unknown as string,
            content: contentState,
            images: filesInputState,
        });
    };

    return (
        <Form isPending={isPending} onSubmit={handlePostSubmit} type="post" />
    );
}
