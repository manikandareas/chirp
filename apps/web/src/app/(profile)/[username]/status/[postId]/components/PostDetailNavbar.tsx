'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/common/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PostDetailNavbar() {
    const router = useRouter();
    return (
        <header className="sticky top-0 z-50 h-[53px] w-full border-x bg-background/50 p-4 backdrop-blur-sm">
            <div className="flex h-full items-center space-x-2 text-base text-neutral-200">
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
