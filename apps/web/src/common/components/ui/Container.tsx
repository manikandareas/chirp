import { cn } from '@/common/lib/utils';

type ContainerProps = React.PropsWithChildren<React.ComponentProps<'main'>>;
export default function Container(props: ContainerProps) {
    return (
        <main
            {...props}
            className={cn(
                'relative w-full border-x sm:max-w-[37.5rem]',
                props.className,
            )}
        >
            {props.children}
        </main>
    );
}
