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
import { Reply } from 'lucide-react';
import { Textarea } from '../../../ui/textarea';
import { TComments } from '@/common/constant/comments';

type CommentFormModalProps = {
    comment: TComments[number];
};

const CommentFormModal: React.FC<CommentFormModalProps> = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Reply size={18} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Comment</DialogTitle>
                    <DialogDescription>
                        Replying for @manikxixi
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Textarea />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'secondary'}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Comment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CommentFormModal;
