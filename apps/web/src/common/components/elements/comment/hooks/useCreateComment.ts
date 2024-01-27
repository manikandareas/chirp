import { queryClient } from '@/common/components/provider/ReactQueryProvider';
import { CreateCommentDTOPartial, useCreateCommentMutation } from '@chirp/api';
import { toast } from 'sonner';

export const useCreateComment = (
    props: CreateCommentDTOPartial,
    onSettled: () => void,
) => {
    const { mutateAsync, ...mutation } = useCreateCommentMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts', props.postId],
            });
            toast.success('Great! Your comment has been successfully created!');
        },
        onError: () => {
            toast.error(
                'Oops! Unable to create comment at the moment. Please review your content and try again. If issues persist, reach out to our support team. Thanks for your understanding!',
            );
        },
        onSettled,
    });

    const onCommentPress = async () => {
        await mutateAsync({
            postId: props.postId,
            parentId: props.parentId,
            message: props.message,
        });
    };

    return {
        onCommentPress,
        ...mutation,
    };
};
