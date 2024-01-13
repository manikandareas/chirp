import { Metadata } from 'next';
import Container from '@/common/components/ui/Container';
import { axios } from '@/common/lib/axios';
import { getPostById } from '@chirp/api';

import PostDetail from './components/PostDetail';
import PostDetailLayout from './components/PostDetailLayout';
import { PostDetailProvider } from './context/PostDetailProvider';

type PostDetailPageProps = {
    params: { postId: string };
};

export async function generateMetadata({
    params,
}: PostDetailPageProps): Promise<Metadata> {
    const postId = params.postId;
    const postQueryResult = await getPostById(postId, {
        axios,
    });
    return {
        title: postQueryResult.data?.data.content || 'Post Detail',
    };
}

export default function PostDetailPage({
    params,
}: {
    params: { postId: string };
}) {
    return (
        <PostDetailProvider postId={params.postId}>
            <PostDetailLayout>
                <Container>
                    <PostDetail />
                </Container>
            </PostDetailLayout>
        </PostDetailProvider>
    );
}
