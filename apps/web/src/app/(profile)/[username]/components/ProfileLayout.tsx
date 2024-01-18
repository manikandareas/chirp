import HomeAsideNavigation from '@/app/components/HomeAsideNavigation';

import ProfileSidebarColumn from './ProfileSidebarColumn';
import ProfileNavbar from './ProfileNavbar';

type ProfileLayoutProps = {
    children: React.ReactNode;
};
export default function ProfileLayout(props: ProfileLayoutProps) {
    return (
        <div className={'mx-auto w-full sm:max-w-7xl '}>
            <div className="relative flex justify-center  lg:justify-normal lg:gap-4">
                <HomeAsideNavigation />
                <div className="relative w-full sm:max-w-[37.5rem]">
                    <ProfileNavbar />
                    {props.children}
                </div>

                <ProfileSidebarColumn />
            </div>
        </div>
    );
}
