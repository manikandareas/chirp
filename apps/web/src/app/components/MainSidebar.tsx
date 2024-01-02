import { buttonVariants } from '@/common/components/ui/button';
import { mainSidebarMenus } from '@/common/constant/mainSidebar';
import { cn } from '@/common/lib/utils';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { LiaFeatherSolid } from 'react-icons/lia';
import UserWizard from './UserWizard';

export default function MainSidebar() {
    const menuActiveStyle = 'text-white';
    return (
        <aside className="xl:w-[17.188rem] w-20 h-screen max-h-screen sticky top-0 py-1 overflow-hidden">
            <div className="space-y-1.5">
                <header className="xl:px-3 xl:block flex justify-center">
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

                <div className="flex flex-col items-center xl:items-start gap-y-3">
                    {mainSidebarMenus.map((menu, idx) => (
                        <Link
                            key={menu.label}
                            href={menu.href}
                            className={cn(
                                'flex items-center sm:gap-x-4 sm:px-4 py-3 px-3 text-xl font-thin rounded-full sm:w-fit hover:bg-neutral-900 text-white/80',
                                idx === 0 && menuActiveStyle
                            )}
                        >
                            <menu.icon />
                            <span className="hidden xl:block">
                                {menu.label}
                            </span>
                        </Link>
                    ))}
                    <button className="bg-sky-500 hover:bg-sky-400 xl:w-[90%] p-3 hidden xl:block rounded-full text-white">
                        Post
                    </button>
                    <button className="bg-sky-500 hover:bg-sky-400 w-fit p-2 rounded-full text-white xl:hidden">
                        <LiaFeatherSolid size={24} />
                    </button>
                </div>

                <div className="absolute bottom-4 w-full mr-8 sm:max-w-[98%] sm:block flex justify-center">
                    <UserWizard />
                </div>
            </div>
        </aside>
    );
}
