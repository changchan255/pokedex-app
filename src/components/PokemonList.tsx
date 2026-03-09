
import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { fetchPokemonData, type Pokemon } from '../services/pokemonApi';
import Search from './Search';
import Filter from './Filter';
import { filterPokemon } from '../utils/filterPokemon';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    const [page, setPage] = useState(0);
    const limit = 200;
    const ITEMS_PER_PAGE = 20;

    const filteredPokemon = filterPokemon(pokemonList, search, selectedType);
    const paginatedPokemon = filteredPokemon.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    
    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const data = await fetchPokemonData(page, limit);
                setPokemonList(data);
            } catch {
                setError('Failed to load Pokemon data.');
            } finally {
                setLoading(false);
            }

        };

        loadPokemon();
    }, [page]);

    if(loading) { return <p>Loading...</p> }
    if(error) { return <p>{error}</p> }

  return (
    <>
    <Search search={search} setSearch={setSearch} />
    <Filter selectedType={selectedType} setSelectedType={setSelectedType} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 max-w-3xl mx-auto">
          {paginatedPokemon.map((pokemon) => (
            <PokemonCard 
            key={pokemon.name} 
            name={pokemon.name} 
            type={pokemon.type} 
            imgUrl={pokemon.imgUrl} />
          ))}
        </div>

    <div className="flex justify-center gap-4 my-4">
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
        >
            Previous
        </button>
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
            onClick={() => setPage((prev) => prev + 1)}
        >
            Next
        </button>   
    </div>
    </>
  );
}

export default PokemonList;
