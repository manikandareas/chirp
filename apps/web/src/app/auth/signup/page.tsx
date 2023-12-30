import { Metadata } from 'next';
import ChirpPoster from '../components/ChirpPoster';
import Container from '../components/Container';
import FormTabs from './components/FormTabs';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: '...',
};
export default function SignUpPage() {
    return (
        <Container>
            <FormTabs />
            <ChirpPoster variants="right" />
        </Container>
    );
}
