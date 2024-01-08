import { Metadata } from 'next';

import AuthChirpPoster from '../components/AuthChirpPoster';
import AuthContainer from '../components/AuthContainer';
import SignUpFormTabs from './components/SignUpFormTabs';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: '...',
};
export default function SignUpPage() {
    return (
        <AuthContainer>
            <SignUpFormTabs />
            <AuthChirpPoster variants="right" />
        </AuthContainer>
    );
}
