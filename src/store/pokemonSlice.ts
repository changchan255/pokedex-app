import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemonData, fetchPokemonByType, type Pokemon } from "../services/pokemonApi";

type PokemonState = {
  list: Pokemon[];
  loading: boolean;
  error: string | null;
};

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null
};

export const loadPokemon = createAsyncThunk(
  "pokemon/loadPokemon",
  async ({ page, limit }: { page: number; limit: number }) => {
    return await fetchPokemonData(page, limit);
  }
);

export const loadPokemonByType = createAsyncThunk(
  "pokemon/loadPokemonByType",
  async (type: string) => {
    return await fetchPokemonByType(type);
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* load pokemon */
      .addCase(loadPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadPokemon.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load pokemon";
      })

        /* filter by type */
      .addCase(loadPokemonByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPokemonByType.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadPokemonByType.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load pokemon by type";
      });
  }
});

export default pokemonSlice.reducer;
