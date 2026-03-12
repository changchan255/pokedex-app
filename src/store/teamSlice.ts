import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTeam, addToTeam, updateTeam, deleteFromTeam } from "../services/teamApi";

type PokemonTeam = {
  id: number;
  pokemonId: number;
  nickname: string;
};

type TeamState = {
  team: PokemonTeam[];
  loading: boolean;
  error: string | null;
};

const initialState: TeamState = {
  team: [],
  loading: false,
  error: null
};

export const fetchTeam = createAsyncThunk(
  "team/fetchTeam",
  async () => {
    return await getTeam();
  }
);

export const addPokemon = createAsyncThunk(
  "team/addPokemon",
  async ({ pokemonId, nickname }: { pokemonId: number; nickname: string }) => {
    return await addToTeam(pokemonId, nickname);
  }
);

export const updatePokemon = createAsyncThunk(
  "team/updatePokemon",
  async ({ id, pokemonId, nickname }: { id: number; pokemonId: number; nickname: string }) => {
    return await updateTeam(id, pokemonId, nickname);
  }
);

export const removePokemon = createAsyncThunk(
  "team/removePokemon",
  async (id: number) => {
    await deleteFromTeam(id);
    return id;
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.team = action.payload;
      })

      .addCase(addPokemon.fulfilled, (state, action) => {
        state.team.push(action.payload);
      })

      .addCase(updatePokemon.fulfilled, (state, action) => {
        const index = state.team.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.team[index] = action.payload;
        }
      })

      .addCase(removePokemon.fulfilled, (state, action) => {
        state.team = state.team.filter(p => p.id !== action.payload);
      });
  }
});

export default teamSlice.reducer;
