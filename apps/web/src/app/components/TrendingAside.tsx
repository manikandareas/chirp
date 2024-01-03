import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { dummyTrending } from '@/common/constant/trending';

export default function TrendingAside() {
    return (
        <main className="h-full w-full rounded-2xl bg-primary-foreground overflow-hidden">
            <h1 className="text-xl font-semibold p-4">Trends for you</h1>

            <div>
                {dummyTrending.map((item) => (
                    <Link
                        key={item.content}
                        href={'#'}
                        className="px-4 py-2 flex hover:bg-neutral-800"
                    >
                        <div className="flex-1">
                            <p className="text-muted-foreground text-sm">
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
                    className="p-4 flex hover:bg-neutral-800 text-sky-600 text-sm "
                >
                    Show more
                </Link>
            </div>
        </main>
    );
}
