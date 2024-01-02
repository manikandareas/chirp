import Layout from './components/Layout';
import FormCreatePost from './components/form-post/FormCreatePost';
import { FormPostProvider } from './context/FormPostProvider';

export default function Home() {
    return (
        <Layout>
            <main className="h-[200vh] border-x overflow-clip">
                <FormPostProvider>
                    <FormCreatePost />
                </FormPostProvider>
            </main>
        </Layout>
    );
}
