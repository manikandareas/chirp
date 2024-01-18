import Link from 'next/link';
import { cn } from '@/common/lib/utils';

export default function ProfileNavigationTimelines() {
    const activStyle = 'border-b-4 border-primary text-white';

    return (
        <header className="h-[53px] w-full border-b bg-background/50 backdrop-blur-sm">
            <nav className="flex h-full text-base text-muted-foreground">
                <Link
                    href={'#'}
                    className="grid grow  place-items-center hover:bg-primary/10"
                >
                    <span
                        className={cn(
                            'grid h-full place-items-center',
                            activStyle,
                        )}
                    >
                        Posts
                    </span>
                </Link>
                <Link
                    href={'#'}
                    aria-disabled={true}
                    className="grid grow  place-items-center hover:bg-primary/10"
                >
                    <span className="grid h-full place-items-center">
                        Replies
                    </span>
                </Link>
                <Link
                    href={'#'}
                    aria-disabled={true}
                    className="grid grow  place-items-center hover:bg-primary/10"
                >
                    <span className="grid h-full place-items-center">
                        Highlights
                    </span>
                </Link>
                <Link
                    href={'#'}
                    aria-disabled={true}
                    className="grid grow  place-items-center hover:bg-primary/10"
                >
                    <span className="grid h-full place-items-center">
                        Media
                    </span>
                </Link>
                <Link
                    href={'#'}
                    aria-disabled={true}
                    className="grid grow  place-items-center hover:bg-primary/10"
                >
                    <span className="grid h-full place-items-center">
                        Likes
                    </span>
                </Link>
            </nav>
        </header>
    );
}
