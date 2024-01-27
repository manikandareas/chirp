import { Metadata } from 'next';
import Container from '@/common/components/ui/Container';
import { axios } from '@/common/lib/axios';
import { getPostById } from '@chirp/api';

import PostDetail from './components/PostDetail';
import { PostDetailProvider } from './context/PostDetailProvider';
import PostDetailNavbar from './components/PostDetailNavbar';
import PostDetailSidebarColumn from './components/PostDetailSidebarColumn';

type PostDetailPageProps = {
    params: { postId: string };
};

export const generateMetadata = async ({
    params,
}: PostDetailPageProps): Promise<Metadata> => {
    const postId = params.postId;
    const postQueryResult = await getPostById(postId, {
        axios,
    });
    return {
        title: postQueryResult.data?.data.content || 'Post Detail',
    };
};

const PostDetailPage: React.FC = () => {
    return (
        <PostDetailProvider>
            <Container>
                <PostDetailNavbar />
                <PostDetail />
            </Container>
            <PostDetailSidebarColumn />
        </PostDetailProvider>
    );
};
export default PostDetailPage;
