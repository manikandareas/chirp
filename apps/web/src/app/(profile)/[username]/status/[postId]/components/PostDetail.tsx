'use client';

import { Post, PostLoading } from '@/common/components/elements/post';

import { usePostDetailContext } from '../context/PostDetailProvider';

import CommentList from '@/common/components/elements/comment/CommentList';
import CommentForm from '@/common/components/elements/comment/Form/CommentForm';

export default function PostDetail() {
    const { data } = usePostDetailContext();

    if (!data) return <PostLoading />;
    return (
        <>
            <Post post={data.data} asLink={false} />
            <CommentForm />
            <CommentList comments={data.data.comments} />

            <div className="h-16" />
        </>
    );
}
