
import { useState, useEffect } from 'react';
import pokedexLogo from "../assets/pokedex-logo.png";
import PokemonCard from './PokemonCard';
import { fetchPokemonByType, fetchPokemonData, type Pokemon } from '../services/pokemonApi';
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

    const filteredPokemon = filterPokemon(pokemonList, search);
    const paginatedPokemon = filteredPokemon.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

    
    useEffect(() => {
        setLoading(true);  
        setError(null);

        const loadPokemon = async () => {
            try {
                if (selectedType === "all") {
                    const data = await fetchPokemonData(0, limit);
                    setPokemonList(data);

                } else {
                    const data = await fetchPokemonByType(selectedType);
                    setPokemonList(data);
                }
            } catch {
                setError('Failed to load Pokemon data.');
            } finally {
                setLoading(false);
            }

        };

        loadPokemon();
    }, [selectedType]);

    useEffect(() => {
    setPage(0);
}, [selectedType]);

    if(loading) { return <p>Loading...</p> }
    if(error) { return <p>{error}</p> }

  return (
    <>
    <div>
        <img src={pokedexLogo} alt="Pokedex" className="w-full h-18 object-contain rounded-lg mb-6"/>
    </div>
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
            disabled={page >= totalPages - 1}
        >
            Next
        </button>   
    </div>
    </>
  );
}

export default PokemonList;
