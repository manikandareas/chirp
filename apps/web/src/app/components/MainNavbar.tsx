import { cn } from '@/common/lib/utils';
import Link from 'next/link';

export default function MainNavbar() {
    const activStyle = 'border-b-4 border-sky-500 text-white';

    return (
        <header className="h-[53px] border w-full sticky top-0 bg-background/50 backdrop-blur-sm">
            <div className="flex text-muted-foreground h-full text-base">
                <Link
                    href={'#'}
                    className="grid place-items-center  grow hover:bg-neutral-900"
                >
                    <nav
                        className={cn(
                            'h-full grid place-items-center',
                            activStyle
                        )}
                    >
                        For you
                    </nav>
                </Link>
                <Link
                    href={'#'}
                    aria-disabled={true}
                    className="grid place-items-center  grow hover:bg-neutral-900"
                >
                    <nav className="h-full grid place-items-center">
                        Following
                    </nav>
                </Link>
            </div>
        </header>
    );
}
