import MainNavbar from '@/app/components/MainNavbar';
import MainSidebar from '@/app/components/MainSidebar';
import SidebarColumn from './SidebarColumn';
import PostDetailNavbar from './PostDetailNavbar';

type PostDetailLayoutProps = {
    children: React.ReactNode;
};
export default function PostDetailLayout(props: PostDetailLayoutProps) {
    return (
        <div className={'w-full sm:max-w-7xl mx-auto '}>
            <div className="flex relative lg:gap-4">
                <MainSidebar />
                <div className="sm:max-w-[37.5rem] w-full relative">
                    <PostDetailNavbar />
                    {props.children}
                </div>

                <SidebarColumn />
            </div>
        </div>
    );
}
