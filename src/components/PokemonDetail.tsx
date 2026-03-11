import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { typeColors } from "../constants/typeColors";
import { parseEvolutionChain } from "../utils/parseEvolutionChain";
import { addToTeam, isInTeam} from "../services/teamApi";

function PokemonDetail() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState<any>(null);
    const [species, setSpecies] = useState<any>(null);
    const [evolutions, setEvolutions] = useState<string[]>([]);
    const [nickname, setNickname] = useState("");
    const [isMyTeam, setIsMyTeam] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await res.json();
                setPokemon(data);

                const exist = await isInTeam(data.id);
                setIsMyTeam(exist);

                const speciesRes = await fetch(data.species.url);
                const speciesData = await speciesRes.json();
                setSpecies(speciesData);

                const evolutionRes = await fetch(speciesData.evolution_chain.url);
                const evolutionData = await evolutionRes.json();
                const evoChain = parseEvolutionChain(evolutionData.chain);
                setEvolutions(evoChain);

            } catch {
                setError('Failed to load Pokemon details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetail();
    }, [name]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!pokemon) return <div>Pokemon not found.</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isMyTeam) {
            alert("This Pokémon is already in your team!");
            return;
        }
        await addToTeam(pokemon.id, nickname);
        setIsMyTeam(true);
        setNickname("");
        alert(`${pokemon.name} added to team with nickname "${nickname}"!`);
    }

    return (
        <div className="max-w-6xl mx-auto my-12">
            <div className="flex justify-start items-center gap-5 m-4">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-48 h-48 bg-amber-100 object-contain rounded-xl" />
                <div>
                    <h1 className="text-3xl font-bold capitalize">{name}</h1>
                    <div className="font-semibold">Types:
                        {pokemon.types.map((t: any) => <span key={t.type.name} className={`inline-block m-3 text-white rounded-full px-4 py-1 text-xs capitalize ${typeColors[t.type.name] || 'bg-gray-400'}`}>
                            {t.type.name}
                        </span>)}
                    </div>
                     {species && (
                        <div>
                            <div className="font-semibold">Species: {species.color.name}</div>
                            <p className="italic mt-2">{species.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text}</p>
                        </div>
                    )}
                </div>
                <div>
                    {isMyTeam ? (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
                        This Pokémon is in your team!
                    </div>
                    ) : (<form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2"
                            />

                            <button
                                type="submit"
                                disabled={!nickname}
                                className="bg-amber-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-amber-600 transition"
                            >
                                Add to team
                            </button>
                            </form>)}
                </div>
            </div>
           <div className="flex justify-start gap-14 mx-4 my-8">
                <div className="">
                    <h2 className="text-3xl font-bold mb-3">Stats</h2>
                    <ul className="ml-3">
                        {pokemon.stats.map((stat: any) => (
                            <li className="capitalize" key={stat.stat.name}>
                                {stat.stat.name}: <strong>{stat.base_stat}</strong> 
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="">
                    <h3 className="text-2xl font-bold mb-3">Height</h3>
                    <span className="">{pokemon.height / 10} m</span>
                    <h3 className="text-2xl font-bold my-3">Weight</h3>
                    <span className="">{pokemon.weight / 10} kg</span>
                    </div>
                <div className="">
                    <h3 className="text-2xl font-bold mb-3">Abilities</h3>
                    <div className="flex gap-2 flex-wrap">
                        {pokemon.abilities.map((a: any) => (
                        <span
                            key={a.ability.name}
                            className="bg-gray-200 px-3 py-1 rounded-full text-sm capitalize"
                        >
                            {a.ability.name}
                        </span>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="text-3xl font-bold m-4">Evolution Chain:</div>
            <div className="flex flex-wrap gap-2 mt-2 ml-12">
                {evolutions.map((name) => (
                    <div key={name} className="text-center">
                        <img className="w-32 h-32 object-contain" src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`} />
                        <p className="capitalize mt-3">{name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PokemonDetail;
