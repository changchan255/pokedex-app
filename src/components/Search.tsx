type SearchProps = {
    search: string;
    setSearch: (value: string) => void;
}

function Search({ search, setSearch }: SearchProps) { 
  
    return (
        <div className="my-4 flex justify-center">
            <input
                type="text"
                placeholder="Search Pokemon..."
                className="w-1/3 p-2 rounded-lg border border-gray-300 bg-white text-black
                        dark:border-gray-600 dark:bg-gray-700 dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

export default Search;
