import { type Pokemon } from "../services/pokemonApi";

export function filterPokemon(pokemonList: Pokemon[], search: string, type: string) {
    return pokemonList.filter((pokemon) => {
        const matchName = pokemon.name.toLowerCase().includes(search.toLowerCase());

        const matchType = type === "all" || pokemon.type === type

        return matchName && matchType;
    });
}
