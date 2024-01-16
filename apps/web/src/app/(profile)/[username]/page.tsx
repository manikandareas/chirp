import Container from '@/common/components/ui/Container';

import ProfileLayout from './components/ProfileLayout';

export default async function ProfilePage({
    params,
}: {
    params: { username: string };
}) {
    const user = await fetch(
        `http://localhost:8000/api/users/${params.username}?posts=true`,
    ).then((res) => res.json());
    console.log({ posts: user?.data.posts });
    return (
        <ProfileLayout>
            <Container>Profile Page</Container>
        </ProfileLayout>
    );
}
