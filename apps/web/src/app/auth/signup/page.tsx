import ChirpPoster from '../components/ChirpPoster';
import Container from '../components/Container';
import SignUpForm from './components/SignUpForm';

export default function SignUpPage() {
    return (
        <Container>
            <SignUpForm />
            <ChirpPoster variants="right" />
        </Container>
    );
}
