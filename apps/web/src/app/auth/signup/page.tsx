import { Metadata } from 'next';
import ChirpPoster from '../components/ChirpPoster';
import AuthContainer from '../components/AuthContainer';
import FormTabs from './components/FormTabs';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: '...',
};
export default function SignUpPage() {
    return (
        <AuthContainer>
            <FormTabs />
            <ChirpPoster variants="right" />
        </AuthContainer>
    );
}
