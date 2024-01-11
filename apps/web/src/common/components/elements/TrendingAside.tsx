import Link from 'next/link';
import { dummyTrending } from '@/common/constant/trending';
import { MoreHorizontal } from 'lucide-react';

export default function TrendingAside() {
    return (
        <main className="h-full w-full overflow-hidden rounded-2xl bg-secondary">
            <h1 className="p-4 text-xl font-semibold">Trends for you</h1>

            <div>
                {dummyTrending.map((item) => (
                    <Link
                        key={item.content}
                        href={'#'}
                        className="flex px-4 py-2 hover:bg-primary"
                    >
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground">
                                {item.title}
                            </p>
                            <h1>{item.content}</h1>
                            <small className="text-muted-foreground">
                                {item.posts}
                            </small>
                        </div>

                        <div>
                            <MoreHorizontal
                                className="text-muted-foreground"
                                size={18}
                            />
                        </div>
                    </Link>
                ))}
                <Link
                    href={'#'}
                    className="flex p-4 text-sm text-neutral-300 hover:bg-primary "
                >
                    Show more
                </Link>
            </div>
        </main>
    );
}
