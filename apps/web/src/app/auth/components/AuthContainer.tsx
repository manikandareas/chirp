import { PropsWithChildren } from 'react';

export default function AuthContainer({ children }: PropsWithChildren) {
    return (
        <main className="relative grid h-screen w-full bg-neutral-200 md:grid-cols-2 dark:bg-gradient-to-tr dark:from-neutral-900 dark:to-neutral-950 ">
            {children}
        </main>
    );
}
