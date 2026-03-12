import { useState } from "react";
import { useTeam } from "../context/TeamContext";
import toast from "react-hot-toast";

function MyTeam() {
    const { team, removePokemon, updatePokemon } = useTeam();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [newNickname, setNewNickname] = useState("");

    const handleRemove = async (id: number) => {
        try {
            await removePokemon(id);
            toast.success("Pokémon removed from team!");
        } catch (error) {
            toast.error("Failed to remove Pokémon from team.");
        }
    };

    const handleSave = async (id: number) => {
        if (!newNickname.trim()) return;

        const pokemon = team.find(p => p.id === id);
        if (!pokemon) return;

        try {
            await updatePokemon(id, pokemon.pokemonId, newNickname);
            toast.success("Nickname updated!");
            setEditingId(null);
            setNewNickname("");
        } catch (error) {
            toast.error("Failed to update nickname.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-12 text-gray-900 dark:text-gray-100">
            <h1 className="text-4xl font-bold mb-6">My Team</h1>
            
            {team.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                Your team is empty. Add some Pokémon from their detail pages!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map(pokemon => (
                    <div
                    key={pokemon.id}
                    className="flex flex-col justify-center items-center
                                bg-white dark:bg-gray-800
                                p-4 rounded-lg shadow"
                    >
                    {editingId === pokemon.id ? (
                        <div className="flex gap-2 mt-2">
                        <input
                            value={newNickname}
                            onChange={(e) => setNewNickname(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-gray-700
                                    text-gray-900 dark:text-white
                                    px-2 py-1 rounded"
                        />

                        <button
                        type="button"
                            onClick={() => handleSave(pokemon.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600 transition"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="bg-red-400 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-500 transition"
                        >
                            Cancel
                        </button>
                        </div>
                    ) : (
                        <div>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`}
                            alt={pokemon.nickname}
                            className="w-24 mx-auto"
                        />
                        <h2 className="text-lg font-bold text-center">
                            {pokemon.nickname}
                        </h2>
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
                        className="mx-2 mt-2 px-4 py-2
                                    bg-blue-500 hover:bg-blue-600
                                    dark:bg-blue-600 dark:hover:bg-blue-700
                                    text-white rounded cursor-pointer transition
                                    disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                        Edit
                        </button>

                        <button
                            type="button"
                            disabled={editingId !== null}
                            onClick={() => handleRemove(pokemon.id)}
                            className="mx-2 mt-2 px-4 py-2
                                        bg-red-500 hover:bg-red-600
                                        dark:bg-red-600 dark:hover:bg-red-700
                                        text-white rounded cursor-pointer transition
                                        disabled:bg-gray-400 disabled:cursor-not-allowed"
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
