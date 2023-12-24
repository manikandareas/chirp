import { Metadata } from 'next';
import ChirpPoster from './components/ChirpPoster';
import SignInForm from './components/SignInForm';

export const metadata: Metadata = {
    title: 'Sign in | Chirp',
    description: '...',
};

export default function SignInPage() {
    return (
        <main className="w-full h-screen grid md:grid-cols-2 p-2 relative bg-neutral-200 dark:bg-gradient-to-tr dark:from-neutral-900 dark:to-neutral-950 ">
            <ChirpPoster />
            <SignInForm />
        </main>
    );
}
