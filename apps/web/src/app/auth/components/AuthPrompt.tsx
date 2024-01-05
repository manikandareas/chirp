import Link from 'next/link';

type AuthPromptProps = {
    variant: 'signin' | 'signup';
};

const authPromptVariants = {
    signin: {
        href: '/auth/signin',
        description: 'Already have an account? ',
        linkText: 'Sign In',
    },
    signup: {
        href: '/auth/signup',
        description: "Don't have an account? ",
        linkText: 'Sign Up',
    },
};

export default function AuthPrompt(props: AuthPromptProps) {
    return (
        <p className="text-center text-sm">
            {authPromptVariants[props.variant].description}{' '}
            <Link
                href={authPromptVariants[props.variant].href}
                className="text-blue-500"
            >
                {authPromptVariants[props.variant].linkText}
            </Link>
        </p>
    );
}
