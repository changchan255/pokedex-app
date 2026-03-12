import { typeColors } from "../constants/typeColors";
import { Link } from "react-router-dom";

function PokemonCard(pokemon: { name: string; type: string; imgUrl: string }) {
    
    return (
       <div className="w-full max-w-xs h-full bg-amber-100 dark:bg-gray-400 rounded-lg shadow-md">
            <div className="flex justify-center p-4">
                <img
                src={pokemon.imgUrl}
                alt={pokemon.name}
                className="h-32 object-contain"
                />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-b-lg p-4">
                <Link to={`/pokemon/${pokemon.name}`}>
                <h2
                    className={`font-bold capitalize min-h-[2.5rem] text-gray-900 dark:text-white ${
                    pokemon.name.length > 12 ? "text-sm" : "text-xl"
                    }`}
                >
                    {pokemon.name}
                </h2>
                </Link>

                <p
                className={`inline-block mt-3 text-white rounded-full px-4 py-1 text-xs font-semibold capitalize ${
                    typeColors[pokemon.type] || "bg-gray-400"
                }`}
                >
                {pokemon.type}
                </p>
            </div>
        </div>
    );
}

export default PokemonCard;
