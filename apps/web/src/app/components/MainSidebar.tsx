import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/common/components/ui/avatar';
import { Button, buttonVariants } from '@/common/components/ui/button';
import { mainSidebarMenus } from '@/common/constant/mainSidebar';
import { cn } from '@/common/lib/utils';
import { MenuIcon, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';

export default function MainSidebar() {
    const menuActiveStyle = 'text-white';
    return (
        <aside className="w-[17.188rem] h-screen max-h-screen sticky top-0 py-1 space-y-1.5 overflow-hidden">
            <header className="px-4">
                <Link
                    href={'/'}
                    className={cn(
                        buttonVariants({ size: 'icon', variant: 'ghost' }),
                        'rounded-full'
                    )}
                >
                    <FaXTwitter size={30} />
                </Link>
            </header>

            <div className="flex flex-col gap-3">
                {mainSidebarMenus.map((menu, idx) => (
                    <Link
                        key={menu.label}
                        href={menu.href}
                        className={cn(
                            'flex items-center gap-4 px-4 py-3 text-xl font-thin rounded-full w-fit hover:bg-neutral-900 text-muted-foreground',
                            idx === 0 && menuActiveStyle
                        )}
                    >
                        <menu.icon />
                        <span>{menu.label}</span>
                    </Link>
                ))}
                <button className="bg-sky-500 hover:bg-sky-400 w-[90%] p-3 rounded-full text-white">
                    Post
                </button>
            </div>

            <div className="absolute bottom-4 w-full mr-8 max-w-[98%]">
                <div className="flex justify-between items-center p-4 hover hover:bg-neutral-900 rounded-full cursor-pointer">
                    <div className="flex gap-4 items-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="leading-tight">
                            <h1>Manik a</h1>
                            <h2 className="text-muted-foreground">
                                @manikxixi
                            </h2>
                        </div>
                    </div>
                    <MoreHorizontal />
                </div>
            </div>
        </aside>
    );
}
