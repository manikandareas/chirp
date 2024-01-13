import { PropsWithChildren } from 'react';
import { fontSourceCodePro } from '@/common/lib/fonts';
import { cn } from '@/common/lib/utils';

type SubTitlePageProps = PropsWithChildren & {
    className?: string;
};

export default function SubTitlePage({
    children,
    className,
}: SubTitlePageProps) {
    return (
        <p className={cn(fontSourceCodePro.className, className)}>{children}</p>
    );
}
