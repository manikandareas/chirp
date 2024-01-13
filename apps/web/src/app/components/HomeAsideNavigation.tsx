import Link from 'next/link';
import UserWizard from '@/common/components/elements/UserWizard';
import { buttonVariants } from '@/common/components/ui/button';
import { mainSidebarMenus } from '@/common/constant/mainSidebar';
import { cn } from '@/common/lib/utils';
import { FaXTwitter } from 'react-icons/fa6';
import { LiaFeatherSolid } from 'react-icons/lia';

export default function HomeAsideNavigation() {
    const menuActiveStyle = 'text-white';
    return (
        <aside className="sticky top-0 z-50 h-screen max-h-screen w-20 overflow-hidden py-1 xl:w-[17.188rem]">
            <div className="space-y-1.5">
                <header className="flex justify-center xl:block xl:px-3">
                    <Link
                        href={'/'}
                        className={cn(
                            buttonVariants({ size: 'icon', variant: 'ghost' }),
                            'rounded-full',
                        )}
                    >
                        <FaXTwitter size={30} />
                    </Link>
                </header>

                <div className="flex flex-col items-center gap-y-3 xl:items-start">
                    {mainSidebarMenus.map((menu, idx) => (
                        <Link
                            key={menu.label}
                            href={menu.href}
                            className={cn(
                                'flex items-center rounded-full px-3 py-3 text-xl font-thin text-white/80 hover:bg-primary sm:w-fit sm:gap-x-4 sm:px-4',
                                idx === 0 && menuActiveStyle,
                            )}
                        >
                            <menu.icon />
                            <span className="hidden xl:block">
                                {menu.label}
                            </span>
                        </Link>
                    ))}
                    <button className="hidden rounded-full bg-primary p-3 text-white hover:bg-primary/90 xl:block xl:w-[90%]">
                        Post
                    </button>
                    <button className="w-fit rounded-full bg-primary p-2 text-white hover:bg-primary/90 xl:hidden">
                        <LiaFeatherSolid size={24} />
                    </button>
                </div>

                <div className="absolute bottom-4 mr-8 flex w-full justify-center sm:block sm:max-w-[98%]">
                    <UserWizard />
                </div>
            </div>
        </aside>
    );
}
