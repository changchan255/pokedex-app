import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import teamReducer from "./teamSlice"

export const store = configureStore({  
    reducer: {
        pokemon: pokemonReducer,
        team: teamReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
