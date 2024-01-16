import { SearchIcon } from 'lucide-react';

export default function SearchBar() {
    return (
        <header className="sticky top-0 grid h-[53px] w-full place-items-center bg-background backdrop-blur-sm ">
            <div className="relative grid w-full place-items-center rounded-full border bg-secondary px-4 py-3">
                <SearchIcon
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-primary"
                    size={18}
                />
                <input
                    type="search"
                    className="w-[80%] border-none bg-transparent px-2 text-sm outline-none"
                />
            </div>
        </header>
    );
}
