import { buttonVariants } from '@/common/components/ui/button';
import { cn } from '@/common/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub, SiTwitter } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

import styles from './styles.module.css';

type ChirpPosterProps = {
    variants: keyof typeof chirpPosterVariants;
};

const chirpPosterVariants = {
    left: {
        className: 'rounded-tr-3xl rounded-br-3xl',
        dataAos: 'fade-right',
    },
    right: {
        className: 'rounded-tl-3xl rounded-bl-3xl',
        dataAos: 'fade-left',
    },
} as const;

export default function ChirpPoster(props: ChirpPosterProps) {
    return (
        <div
            data-aos={chirpPosterVariants[props.variants].dataAos}
            className={cn(
                'hidden md:block border rounded-tr-3xl rounded-br-3xl rounded shadow relative overflow-clip group',
                chirpPosterVariants[props.variants].className
            )}
        >
            <Image
                className={cn(styles.image, 'object-cover object-center')}
                alt="Chirp"
                fill={true}
                style={{
                    transform: 'rotateY(3.142rad)',
                }}
                src={
                    'https://images.unsplash.com/photo-1525770041010-2a1233dd8152?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
            />
            <div className="flex gap-x-4 items-center absolute bottom-4 left-1/2 -translate-x-1/2">
                <Link
                    href={'#'}
                    className={cn(
                        buttonVariants({
                            size: 'icon',
                            className:
                                'bg-sky-400 hover:bg-sky-400/90 hover:text-white/90',
                        }),
                        'rounded-full '
                    )}
                >
                    <SiTwitter size={24} className="text-white" />
                </Link>

                <Link
                    href={'#'}
                    className={cn(
                        buttonVariants({ size: 'icon' }),
                        'rounded-full'
                    )}
                >
                    <FcGoogle size={24} />
                </Link>

                <Link
                    href={'#'}
                    className={cn(
                        buttonVariants({ size: 'icon' }),
                        'rounded-full '
                    )}
                >
                    <SiGithub size={24} />
                </Link>
            </div>
        </div>
    );
}
