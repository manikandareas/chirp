import Container from '@/common/components/ui/Container';

import Profile from './components/Profile';
import ProfileNavigationTimelines from './components/ProfileNavigationTimelines';
import ProfileTimeline from './components/ProfileTimeline';
import { Metadata } from 'next';
import ProfileNavbar from './components/ProfileNavbar';
import ProfileSidebarColumn from './components/ProfileSidebarColumn';
import { ProfileUserProvider } from './context/ProfileProvider';

type ProfilePageProps = {
    params: { username: string };
};

export async function generateMetadata({
    params,
}: ProfilePageProps): Promise<Metadata> {
    const username = params.username;

    return {
        title: username,
    };
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
    return (
        <ProfileUserProvider>
            <Container>
                <ProfileNavbar />
                <Profile />
                <ProfileNavigationTimelines />
                <ProfileTimeline />
            </Container>
            <ProfileSidebarColumn />
        </ProfileUserProvider>
    );
};

export default ProfilePage;
