import MainNavbar from './MainNavbar';
import MainSidebar from './MainSidebar';
import SidebarColumn from './SidebarColumn';

type LayoutProps = {
    children: React.ReactNode;
};
export default function Layout(props: LayoutProps) {
    return (
        <div className={'w-full sm:max-w-7xl mx-auto '}>
            <div className="flex relative lg:gap-4">
                <MainSidebar />
                <div className="sm:max-w-[37.5rem] w-full relative">
                    <MainNavbar />
                    {props.children}
                </div>
                <SidebarColumn />
            </div>
        </div>
    );
}
