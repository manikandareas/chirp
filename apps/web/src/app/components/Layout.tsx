import Container from '@/common/components/ui/Container';
import MainNavbar from './MainNavbar';
import MainSidebar from './MainSidebar';

type LayoutProps = {
    children: React.ReactNode;
};
export default function Layout(props: LayoutProps) {
    return (
        <Container>
            <div className="flex relative">
                <MainSidebar />
                <div className="w-[37.5rem] relative">
                    <MainNavbar />
                    {props.children}
                </div>
            </div>
        </Container>
    );
}
