import HomeAsideNavigation from '@/app/home/components/HomeAsideNavigation';

type ProfileLayoutProps = React.PropsWithChildren;

const ProfileLayout: React.FC<ProfileLayoutProps> = (props) => {
    return (
        <div className={'mx-auto w-full sm:max-w-7xl '}>
            <div className="relative flex justify-center lg:justify-normal lg:gap-4">
                <HomeAsideNavigation />
                {props.children}
            </div>
        </div>
    );
};

export default ProfileLayout;
