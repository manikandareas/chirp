import { cn } from '@/common/lib/utils';

type ContainerProps = React.PropsWithChildren<React.ComponentProps<'main'>>;
export default function Container(props: ContainerProps) {
    return (
        <main
            {...props}
            className={cn('overflow-clip border-x', props.className)}
        >
            {props.children}
        </main>
    );
}
