import { Metadata } from 'next';

import AuthChirpPoster from '../components/AuthChirpPoster';
import SignInForm from './components/SignInForm';

export const metadata: Metadata = {
    title: 'Sign in ',
    description: '...',
};

export default function SignInPage() {
    return (
        <>
            <AuthChirpPoster variants="left" />
            <SignInForm />
        </>
    );
}
