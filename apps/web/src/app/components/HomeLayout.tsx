import { PropsWithChildren } from 'react';

import HomeAsideNavigation from './HomeAsideNavigation';
import HomeNavbar from './HomeNavbar';
import HomeSidebarColumn from './HomeSidebarColumn';

type HomeLayoutProps = PropsWithChildren;
export default function HomeLayout(props: HomeLayoutProps) {
    return (
        <div className={'mx-auto w-full sm:max-w-7xl '}>
            <div className="relative flex justify-center  lg:justify-normal lg:gap-4">
                <HomeAsideNavigation />
                <div className="relative w-full sm:max-w-[37.5rem]">
                    <HomeNavbar />
                    {props.children}
                </div>
                <HomeSidebarColumn />
            </div>
        </div>
    );
}
