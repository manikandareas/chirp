'use client';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/common/components/ui/dialog';
import { PencilLine } from 'lucide-react';
import { PostProps } from './Post';
import { Button } from '../../ui/button';
import { ChangeEvent, ElementRef, useEffect, useRef, useState } from 'react';
import { useUpdatePostMutation } from '@chirp/api';
import { toast } from 'sonner';
import { queryClient } from '../../provider/ReactQueryProvider';
import Loading from '../../ui/loading';

type PostUpdateModalProps = PostProps;

const PostUpdateModal: React.FC<PostUpdateModalProps> = (props) => {
    const [content, setContent] = useState<string>(props.post.content);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const textAreaRef = useRef<ElementRef<'textarea'>>(null);

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.minHeight = '2.75rem';
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height =
                textAreaRef.current.scrollHeight + 'px';
        }
    }, [content]);

    const { mutateAsync, isPending } = useUpdatePostMutation({
        onSuccess: () => {
            toast.success('Successfully updated post');
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
        },
        onError: () => {
            toast.error('Unable to update post');
        },
        onSettled: () => {
            setIsModalOpen(false);
        },
    });

    const handleUpdatePost = async () => {
        await mutateAsync({
            postId: props.post.id,
            authorId: props.post.author.id,
            content,
        });
    };

    useEffect(() => {
        setContent(props.post.content);
        return () => setContent(props.post.content);
    }, [props.post.content, isModalOpen]);

    return (
        <Dialog open={isModalOpen} onOpenChange={(e) => setIsModalOpen(e)}>
            <DialogTrigger className="group/update flex items-center gap-2 text-sm">
                <PencilLine
                    size={18}
                    className="group-hover/update:text-sky-500"
                />
                <span className="group-hover/update:text-sky-500">
                    Update post
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Post</DialogTitle>
                    <DialogDescription>
                        Updating a post means making changes to improve or add
                        information, ensuring the content stays relevant and
                        accurate.
                    </DialogDescription>
                </DialogHeader>
                <textarea
                    ref={textAreaRef}
                    value={content}
                    className="w-full resize-none bg-transparent py-2 text-sm text-neutral-200 outline-none"
                    rows={3}
                    maxLength={280}
                    name="content"
                    id="content"
                    onChange={handleTextAreaChange}
                />
                <DialogFooter className="sm:justify-start">
                    <Button
                        type="button"
                        className="bg-sky-500 hover:bg-sky-500/90"
                        disabled={isPending}
                        onClick={handleUpdatePost}
                    >
                        {!isPending ? (
                            'Update'
                        ) : (
                            <span className="flex items-center">
                                <Loading /> Updating...
                            </span>
                        )}
                    </Button>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={isPending}
                        >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PostUpdateModal;
