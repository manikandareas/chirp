import { Metadata } from 'next';
import ChirpPoster from '../components/ChirpPoster';
import SignInForm from './components/SignInForm';
import AuthContainer from '../components/AuthContainer';

export const metadata: Metadata = {
    title: 'Sign in ',
    description: '...',
};

export default function SignInPage() {
    return (
        <AuthContainer>
            <ChirpPoster variants="left" />
            <SignInForm />
        </AuthContainer>
    );
}
