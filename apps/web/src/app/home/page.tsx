import { Suspense } from 'react';
import {
    FormPostProvider,
    FormCreatePost,
} from '@/common/components/elements/post/form';
import PostLoading from '@/common/components/elements/post/PostLoading';
import Container from '@/common/components/ui/Container';

import HomeSidebarColumn from './components/HomeSidebarColumn';
import HomeNavbar from './components/HomeNavbar';
import HomeTimeline from './components/HomeTimeline';

export default function HomePage() {
    return (
        <>
            <Container>
                <HomeNavbar />
                <FormPostProvider>
                    <FormCreatePost />
                </FormPostProvider>
                <Suspense fallback={<PostLoading.Many />}>
                    <HomeTimeline />
                </Suspense>
            </Container>
            <HomeSidebarColumn />
        </>
    );
}
