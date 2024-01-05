import PostDetailLayout from './components/PostDetailLayout';
import PostDetail from './components/PostDetail';
import { PostDetailProvider } from './context/PostDetailProvider';

export default function DetailPostPage({
    params,
}: {
    params: { postId: string };
}) {
    return (
        <PostDetailProvider postId={params.postId}>
            <PostDetailLayout>
                <main className="border-x overflow-clip">
                    <PostDetail />
                </main>
            </PostDetailLayout>
        </PostDetailProvider>
    );
}
