import { Suspense } from 'react';
import {
    FormCommentPostProvider,
    FormCreatePost,
} from '@/common/components/elements/form-comment-post';
import PostLoading from '@/common/components/elements/post/PostLoading';
import Container from '@/common/components/ui/Container';

import HomeLayout from './components/HomeLayout';
import HomeTimeline from './components/HomeTimeline';

export default function HomePage() {
    return (
        <HomeLayout>
            <Container>
                <FormCommentPostProvider>
                    <FormCreatePost />
                </FormCommentPostProvider>
                <Suspense fallback={<PostLoading.Many />}>
                    <HomeTimeline />
                </Suspense>
            </Container>
        </HomeLayout>
    );
}
