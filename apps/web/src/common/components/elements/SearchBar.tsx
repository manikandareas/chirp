import { SearchIcon } from 'lucide-react';

export default function SearchBar() {
    return (
        <header className="h-[53px] w-full sticky top-0 bg-background backdrop-blur-sm grid place-items-center ">
            <div className="relative px-4 py-3 rounded-full border grid place-items-center bg-secondary w-full">
                <SearchIcon
                    className="absolute top-1/2 -translate-y-1/2 left-5 text-primary"
                    size={18}
                />
                <input
                    type="search"
                    className="bg-transparent border-none w-[80%] text-sm outline-none px-2"
                />
            </div>
        </header>
    );
}
