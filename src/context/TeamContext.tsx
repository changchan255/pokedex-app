import {createContext, useContext, useState, useEffect} from "react";
import { getTeam, addToTeam, updateTeam, deleteFromTeam } from "../services/teamApi";

type PokemonTeam = {
    id: number;
    pokemonId: number;
    nickname: string;
}

type TeamContextType = {
    team: PokemonTeam[];
    addPokemon: (pokemonId: number, nickname: string) => Promise<void>;
    updatePokemon: (id: number, pokemonId: number, nickname: string) => Promise<void>;
    removePokemon: (id: number) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | null>(null);

export function TeamProvider({ children }: { children: React.ReactNode }) {
    const [team, setTeam] = useState<PokemonTeam[]>([]);

    useEffect(() => {
        getTeam().then(setTeam);
    }, []);

    const addPokemon = async (pokemonId: number, nickname: string) => {
        const newPokemon = await addToTeam(pokemonId, nickname);
        setTeam(prev => [...prev, newPokemon]);
    };  

    const updatePokemon = async (id: number, pokemonId: number, nickname: string) => {
        const updatedPokemon = await updateTeam(id, pokemonId, nickname);
        setTeam(prev => prev.map(p => p.id === id ? updatedPokemon : p));
    };

    const removePokemon = async (id: number) => {
        await deleteFromTeam(id);
        setTeam(prev => prev.filter(p => p.id !== id));
    };

    return (
        <TeamContext.Provider value={{ team, addPokemon, updatePokemon, removePokemon }}>
            {children}
        </TeamContext.Provider>
    );
}

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error("useTeam must be used within a TeamProvider");
    }
    return context;
}
