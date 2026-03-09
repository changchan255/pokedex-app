import { typeColors } from "../constants/typeColors";

type FilterProps = {
    selectedType: string;
    setSelectedType: (value: string) => void
}


const types :string[] = [
    "all",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
  "normal"
]

function Filter({ selectedType, setSelectedType }: FilterProps) {
    return (
        <div className="flex flex-wrap gap-2 max-w-4xl mx-auto justify-center">
            {types.map((type) => (
                <button 
                    key={type}
                    className={`m-1 px-4 py-1 rounded-full text-white text-xs font-semibold capitalize ${typeColors[type] || 'bg-gray-400'} ${selectedType === type ? 'ring-2 ring-offset-2 ring-blue-500' : 'opacity-80'} transition`}
                    onClick={() => setSelectedType(type)}
                >
                    {type}
                </button>
            ))}
        </div>
    )
}

export default Filter;
