import SearchBar from '@/common/components/elements/SearchBar';
import TrendingAside from './TrendingAside';

export default function SidebarColumn() {
    return (
        <aside className="w-[21.875rem] space-y-4 h-fit lg:block hidden">
            <SearchBar />
            <TrendingAside />
        </aside>
    );
}
