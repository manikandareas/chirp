import { MoreHorizontal, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { dummyTrending } from '@/common/constant/trending';

export default function TrendingAside() {
    return (
        <aside className="w-[21.875rem] space-y-4 h-fit lg:block hidden">
            <header className="h-[53px] w-full sticky top-0 bg-background backdrop-blur-sm grid place-items-center ">
                <div className="relative px-4 py-3 rounded-full border grid place-items-center bg-secondary w-full">
                    <SearchIcon
                        className="absolute top-1/2 -translate-y-1/2 left-5 text-primary"
                        size={18}
                    />
                    <input
                        type="search"
                        className="bg-transparent border-none w-[80%] text-sm outline-none px-2"
                    />
                </div>
            </header>

            <section className="h-full w-full rounded-2xl bg-primary-foreground overflow-hidden">
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
            </section>
        </aside>
    );
}
