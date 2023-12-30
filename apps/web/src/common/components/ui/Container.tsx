import { cn } from '@/common/lib/utils';

type LayoutProps = {
    children: React.ReactNode;
    className?: string;
};
export default function Container(props: LayoutProps) {
    return (
        <div className={cn('w-full max-w-7xl mx-auto ', props.className)}>
            {props.children}
        </div>
    );
}
