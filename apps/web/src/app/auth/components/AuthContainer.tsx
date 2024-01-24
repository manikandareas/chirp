import { PropsWithChildren } from 'react';

export default function AuthContainer({ children }: PropsWithChildren) {
    return (
        <main className="relative grid h-screen w-full bg-background  md:grid-cols-2 ">
            {children}
        </main>
    );
}
