import SearchBar from '@/common/components/elements/SearchBar';
import TrendingAside from '@/common/components/elements/TrendingAside';

import PostDetailRelevantCardPeople from './PostDetailRelevantCardPeople';

export default function PostDetailSidebarColumn() {
    return (
        <aside className="hidden h-fit w-[21.875rem] space-y-4 lg:block">
            <SearchBar />
            <PostDetailRelevantCardPeople />
            <TrendingAside />
        </aside>
    );
}
