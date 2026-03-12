import { type Pokemon } from "../services/pokemonApi";

export function filterPokemon(pokemonList: Pokemon[], search: string) {
    return pokemonList.filter((pokemon) => 
       pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
}
