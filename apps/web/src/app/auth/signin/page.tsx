import { Metadata } from 'next';

import AuthChirpPoster from '../components/AuthChirpPoster';
import AuthContainer from '../components/AuthContainer';
import SignInForm from './components/SignInForm';

export const metadata: Metadata = {
    title: 'Sign in ',
    description: '...',
};

export default function SignInPage() {
    return (
        <AuthContainer>
            <AuthChirpPoster variants="left" />
            <SignInForm />
        </AuthContainer>
    );
}
