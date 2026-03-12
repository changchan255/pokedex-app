export type Pokemon = {
  id: number;
  name: string;
  type: string;
  imgUrl: string;
};

export async function fetchPokemonData( page: number, limit: number) : Promise<Pokemon[]>{
    const offset = page * limit
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
    }
    const data = await response.json();

    const promiseDetails = data.results.map(async (pokemon: { url: string }) => {
        const detailRes= await fetch(pokemon.url)
        const detail = await detailRes.json();
        
        return {
            id: detail.id,
            name: detail.name,
            type: detail.types?.[0]?.type?.name || 'Unknown',
            imgUrl: detail.sprites.front_default
        }
    });

    return Promise.all(promiseDetails);
}

export async function fetchPokemonByType(type: string): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon by type");
  }

  const data = await res.json();

  const promises = data.pokemon.slice(0, 50).map(async (p: any) => {
    const detailRes = await fetch(p.pokemon.url);
    const detail = await detailRes.json();

    return {
      id: detail.id,
      name: detail.name,
      type: detail.types?.[0]?.type?.name || "Unknown",
      imgUrl: detail.sprites.front_default,
    };
  });

  return Promise.all(promises);
}
