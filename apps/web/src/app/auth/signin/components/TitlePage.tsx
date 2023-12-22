import { fontIBMPlexMono } from '@/common/lib/fonts';
import { cn } from '@/common/lib/utils';
import { PropsWithChildren } from 'react';

export default function TitlePage({ children }: PropsWithChildren) {
    return (
        <h1 className={cn(fontIBMPlexMono.className, 'text-4xl font-semibold')}>
            {children}
        </h1>
    );
}
