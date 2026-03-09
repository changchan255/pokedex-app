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
                className="w-1/3 p-2 border border-gray-300 rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

export default Search;
