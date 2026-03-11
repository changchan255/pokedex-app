import { useEffect, useState } from "react";
import { getTeam, deleteFromTeam, updateTeam } from "../services/teamApi";
import { Link } from "react-router-dom";

type TeamPokemon = {
    id: number;
    pokemonId: number;
    nickname: string;
    name: string;
    imgUrl: string;
};

function MyTeam() {
    const [team, setTeam] = useState<TeamPokemon[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newNickname, setNewNickname] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const teamData = await getTeam();

                const pokemonDetails = await Promise.all(
                    teamData.map(async (member: TeamPokemon) => {
                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${member.pokemonId}`);
                        const data = await res.json();
                        return {
                            ...member,
                            name: data.name,
                            imgUrl: data.sprites.front_default
                        };
                    })
                );
                
                setTeam(pokemonDetails);
            } catch {
                setError("Failed to fetch team data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    const handleRemove = async (id: number, name: string) => {
        await deleteFromTeam(id);
        setTeam(prev => prev.filter(p => p.id !== id));
        alert(`Pokémon ${name} removed from team!`);
    };

    const handleSave = async (id: number) => {
        if (!newNickname.trim()) return;

        const pokemon = team.find(p => p.id === id);
        if (!pokemon) return;

        await updateTeam(id, pokemon.pokemonId, newNickname)

        setTeam(prev =>
            prev.map(p =>
                p.id === id ? { ...p, nickname: newNickname } : p
            )
        );

        setEditingId(null);
        setNewNickname("");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-6xl mx-auto my-12">
            <h1 className="text-4xl font-bold mb-6">My Team</h1>

            {team.length === 0 ? (
                <p className="text-gray-600">
                    Your team is empty. Add some Pokémon from their detail pages!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {team.map(pokemon => (
                        <div key={pokemon.id} className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow">

                            {editingId === pokemon.id ? (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        value={newNickname}
                                        onChange={(e) => setNewNickname(e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />

                                    <button
                                        onClick={() => handleSave(pokemon.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-red-400 text-white px-3 py-1 rounded cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                <img
                                    src={pokemon.imgUrl}
                                    alt={pokemon.name}
                                    className="w-24 mx-auto"
                                />
                                <Link to={`/pokemon/${pokemon.name}`}>
                                <h2 className="text-lg font-bold capitalize text-center">
                                    {pokemon.name}
                                </h2>
                                </Link>
                                <p className="text-gray-600">
                                    Nickname: {pokemon.nickname}
                                </p>
                                </div>
                            )}
                            <div>
                            <button
                                type="button"
                                disabled={editingId !== null}
                                onClick={() => {
                                    setEditingId(pokemon.id);
                                    setNewNickname(pokemon.nickname);
                                }}
                                className="mx-2 mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                            >
                                Edit
                            </button>

                            <button
                            disabled={editingId !== null}
                                onClick={() => handleRemove(pokemon.id, pokemon.name)}
                                className="mx-2 mt-2 px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                            >
                                Remove
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyTeam;
