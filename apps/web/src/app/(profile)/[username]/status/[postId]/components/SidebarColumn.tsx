import SearchBar from '@/common/components/elements/SearchBar';
import RelevantPeopleCard from './RelevantPeopleCard';
import TrendingAside from '@/app/components/TrendingAside';

export default function SidebarColumn() {
    return (
        <aside className="w-[21.875rem] space-y-4 h-fit lg:block hidden">
            <SearchBar />
            <RelevantPeopleCard />
            <TrendingAside />
        </aside>
    );
}
