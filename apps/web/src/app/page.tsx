import { Suspense } from 'react';
import {
    FormCreatePost,
    FormPostProvider,
} from '@/common/components/elements/form-post';
import PostLoading from '@/common/components/elements/post/PostLoading';
import Container from '@/common/components/ui/Container';

import HomeLayout from './components/HomeLayout';
import HomeTimeline from './components/HomeTimeline';

export default function HomePage() {
    return (
        <HomeLayout>
            <Container>
                <FormPostProvider>
                    <FormCreatePost />
                </FormPostProvider>
                <Suspense fallback={<PostLoading.Many />}>
                    <HomeTimeline />
                </Suspense>
            </Container>
        </HomeLayout>
    );
}
