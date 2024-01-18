import Container from '@/common/components/ui/Container';

import ProfileLayout from './components/ProfileLayout';
import { ProfileUserProvider } from './context/ProfileProvider';
import Profile from './components/Profile';
import ProfileNavigationTimelines from './components/ProfileNavigationTimelines';
import ProfileTimeline from './components/ProfileTimeline';
import { Metadata } from 'next';

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

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    return (
        <ProfileUserProvider username={props.params.username}>
            <ProfileLayout>
                <Container>
                    <Profile />
                    <ProfileNavigationTimelines />
                    <ProfileTimeline />
                </Container>
            </ProfileLayout>
        </ProfileUserProvider>
    );
};

export default ProfilePage;
