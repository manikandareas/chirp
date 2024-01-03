import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/common/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { useRemovePostMutation } from '@chirp/api';
import { queryClient } from '../../provider/ReactQueryProvider';
import { toast } from 'sonner';
import Loading from '../../ui/loading';

export default function PostRemoveModal({ id }: { id: string }) {
    const { mutateAsync, isPending } = useRemovePostMutation({
        onError: () => {
            toast.error(
                'Oops! Something went wrong. Unable to delete the post at the moment'
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
            toast.success('Success! The post has been deleted.');
        },
    });

    const handleRemovePost = async () => {
        await mutateAsync(id);
    };
    return (
        <Dialog>
            <DialogTrigger className="group/delete  gap-2 flex items-center text-sm">
                <Trash2
                    size={18}
                    className="group-hover/delete:text-rose-500"
                />
                <span className="group-hover/delete:text-rose-500">
                    Delete post
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post and remove from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleRemovePost}
                        disabled={isPending}
                    >
                        {!isPending ? (
                            'Delete'
                        ) : (
                            <span className="flex items-center">
                                <Loading /> Deleting...
                            </span>
                        )}
                    </Button>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            id="cancel"
                            disabled={isPending}
                        >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
