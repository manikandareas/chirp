import Link from 'next/link';
import { cn } from '@/common/lib/utils';

export default function HomeNavbar() {
    const activStyle = 'border-b-4 border-sky-500 text-white';

    return (
        <header className="sticky top-0 z-50 h-[53px] w-full border bg-background/50 backdrop-blur-sm">
            <div className="flex h-full text-base text-muted-foreground">
                <Link
                    href={'#'}
                    className="grid grow  place-items-center hover:bg-neutral-900"
                >
                    <nav
                        className={cn(
                            'grid h-full place-items-center',
                            activStyle,
                        )}
                    >
                        For you
                    </nav>
                </Link>
                <Link
                    href={'#'}
                    aria-disabled={true}
                    className="grid grow  place-items-center hover:bg-neutral-900"
                >
                    <nav className="grid h-full place-items-center">
                        Following
                    </nav>
                </Link>
            </div>
        </header>
    );
}
