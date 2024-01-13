import HomeAsideNavigation from '@/app/components/HomeAsideNavigation';

import PostDetailNavbar from '../status/[postId]/components/PostDetailNavbar';
import ProfileSidebarColumn from './ProfileSidebarColumn';

type ProfileLayoutProps = {
    children: React.ReactNode;
};
export default function ProfileLayout(props: ProfileLayoutProps) {
    return (
        <div className={'mx-auto w-full sm:max-w-7xl '}>
            <div className="relative flex lg:gap-4">
                <HomeAsideNavigation />
                <div className="relative w-full sm:max-w-[37.5rem]">
                    <PostDetailNavbar />
                    {props.children}
                </div>

                <ProfileSidebarColumn />
            </div>
        </div>
    );
}
