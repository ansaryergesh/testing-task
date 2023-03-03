import { configureStore } from "@reduxjs/toolkit";
import {pokemonsSlice} from "./pokemons.slice";

export const store = configureStore({
    reducer: {
        pokemons:pokemonsSlice
    },
})