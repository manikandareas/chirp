import MainNavbar from './MainNavbar';
import MainSidebar from './MainSidebar';
import TrendingAside from './TrendingAside';

type LayoutProps = {
    children: React.ReactNode;
};
export default function Layout(props: LayoutProps) {
    return (
        <div className={'w-full max-w-7xl mx-auto '}>
            <div className="flex relative lg:gap-4">
                <MainSidebar />
                <div className="w-[37.5rem] relative">
                    <MainNavbar />
                    {props.children}
                </div>
                <TrendingAside />
            </div>
        </div>
    );
}
