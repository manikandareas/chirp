import Layout from './components/Layout';
import FormCreatePost from './components/form-post/FormCreatePost';
import { FormPostProvider } from './context/FormPostProvider';
import PostFeed from './components/PostFeed';
import { Suspense } from 'react';
import PostLoading from '@/common/components/elements/post/PostLoading';

export default function Home() {
    return (
        <Layout>
            <main className="border-x overflow-clip">
                <FormPostProvider>
                    <FormCreatePost />
                </FormPostProvider>
                <Suspense
                    fallback={Array(6)
                        .fill(0)
                        .map((_, idx) => (
                            <PostLoading key={idx} />
                        ))}
                >
                    <PostFeed />
                </Suspense>
            </main>
        </Layout>
    );
}
