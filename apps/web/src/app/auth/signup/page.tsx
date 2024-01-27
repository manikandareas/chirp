import { Metadata } from 'next';

import AuthChirpPoster from '../components/AuthChirpPoster';
import SignUpFormTabs from './components/SignUpFormTabs';
import { SignUpFormProvider } from './context/SignUpFormProvider';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: '...',
};
export default function SignUpPage() {
    return (
        <>
            <SignUpFormProvider>
                <SignUpFormTabs />
            </SignUpFormProvider>
            <AuthChirpPoster variants="right" />
        </>
    );
}
