'use client';
import { Button } from '@/common/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PostDetailNavbar() {
    const router = useRouter();
    return (
        <header className="h-[53px] border-x w-full sticky top-0 bg-background/50 backdrop-blur-sm z-50 p-4">
            <div className="flex text-neutral-200 h-full text-base items-center space-x-2">
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    className="rounded-full"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={20} />
                </Button>
                <h1 className="text-xl font-semibold">Post</h1>
            </div>
        </header>
    );
}
