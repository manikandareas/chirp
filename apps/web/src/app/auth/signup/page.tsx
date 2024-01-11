import { Metadata } from 'next';

import AuthChirpPoster from '../components/AuthChirpPoster';
import AuthContainer from '../components/AuthContainer';
import SignUpFormTabs from './components/SignUpFormTabs';
import { SignUpFormProvider } from './context/SignUpFormProvider';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: '...',
};
export default function SignUpPage() {
    return (
        <AuthContainer>
            <SignUpFormProvider>
                <SignUpFormTabs />
            </SignUpFormProvider>
            <AuthChirpPoster variants="right" />
        </AuthContainer>
    );
}
