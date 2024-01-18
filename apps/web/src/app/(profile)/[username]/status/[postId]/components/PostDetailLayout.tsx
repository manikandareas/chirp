import HomeAsideNavigation from '@/app/components/HomeAsideNavigation';

import PostDetailNavbar from './PostDetailNavbar';
import PostDetailSidebarColumn from './PostDetailSidebarColumn';

type PostDetailLayoutProps = {
    children: React.ReactNode;
};
export default function PostDetailLayout(props: PostDetailLayoutProps) {
    return (
        <div className={'mx-auto w-full sm:max-w-7xl '}>
            <div className="relative flex justify-center  lg:justify-normal lg:gap-4">
                <HomeAsideNavigation />
                <div className="relative w-full sm:max-w-[37.5rem]">
                    <PostDetailNavbar />
                    {props.children}
                </div>

                <PostDetailSidebarColumn />
            </div>
        </div>
    );
}
