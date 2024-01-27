'use client';
import { Button } from '@/common/components/ui/button';
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
import { MessageCircle } from 'lucide-react';
import GrowingTextArea from '@/common/components/ui/GrowingTextArea';
import { useCreateComment } from '../hooks/useCreateComment';
import Loading from '@/common/components/ui/loading';
import { useCommentService } from '../hooks/useCommentServices';

type CommentFormModalProps = {
    comment: {
        id?: string;
        postId: string;
        parent?: {
            author: {
                username: string;
            };
        };
        repliesNumber: number;
    };
    setIsShowChildren?: (param: boolean) => void;
    
};

const CommentFormModal: React.FC<CommentFormModalProps> = (props) => {
    const { content, setContent, isModalOpen, setIsModalOpen, textAreaRef } =
        useCommentService();

    const { onCommentPress, isPending } = useCreateComment(
        {
            message: content,
            parentId: props.comment.id,
            postId: props.comment.postId,
        },
        () => {
            props.setIsShowChildren ? props.setIsShowChildren(true) : null;
            setIsModalOpen(false);
            setContent('');
        },
    );
    return (
        <Dialog open={isModalOpen} onOpenChange={(e) => setIsModalOpen(e)}>
            <DialogTrigger>
                <button className="group/like flex items-center text-neutral-300">
                    <i className="rounded-full p-1.5 group-hover/like:bg-sky-500/20">
                        <MessageCircle
                            size={18}
                            className="group-hover/like:text-sky-500"
                        />
                    </i>
                    <span className="text-xs group-hover/like:text-sky-500">
                        {props.comment?.repliesNumber}
                    </span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Comment</DialogTitle>
                    <DialogDescription>
                        {props.comment.parent?.author.username
                            ? `Replying for @${props.comment.parent?.author.username}`
                            : null}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <GrowingTextArea
                        setState={setContent}
                        state={content}
                        textAreaRef={textAreaRef}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'secondary'} disabled={isPending}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={onCommentPress}
                        disabled={isPending}
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
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CommentFormModal;

CommentFormModal.displayName = 'Comment';
// const CommentFormModal
