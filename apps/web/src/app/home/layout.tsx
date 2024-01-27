import HomeAsideNavigation from './components/HomeAsideNavigation';

type HomeLayoutProps = React.PropsWithChildren;

const HomeLayout: React.FC<HomeLayoutProps> = (props) => {
    return (
        <div className={'mx-auto w-full sm:max-w-7xl '}>
            <div className="relative flex justify-center lg:justify-normal lg:gap-4">
                <HomeAsideNavigation />
                {props.children}
            </div>
        </div>
    );
};

export default HomeLayout;
