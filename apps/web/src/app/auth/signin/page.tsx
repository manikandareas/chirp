import { Metadata } from 'next';
import ChirpPoster from '../components/ChirpPoster';
import SignInForm from './components/SignInForm';
import Container from '../components/Container';

export const metadata: Metadata = {
    title: 'Sign in ',
    description: '...',
};

export default function SignInPage() {
    return (
        <Container>
            <ChirpPoster variants="left" />
            <SignInForm />
        </Container>
    );
}
