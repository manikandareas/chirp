import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
    return (
        <main className="w-full h-screen grid md:grid-cols-2 relative bg-neutral-200 dark:bg-gradient-to-tr dark:from-neutral-900 dark:to-neutral-950 ">
            {children}
        </main>
    );
}
