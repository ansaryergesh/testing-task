import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../api/apiData";
const namespace = 'pokemons';
export const getPokemons = createAsyncThunk(
    `${namespace}/getPokemons`,
    async (size,page) => {
        return await apiData.getPokemons(size,page)
    }
)

const pokemonInfoState = {

}
export const pokemonsSlice = createSlice({
    name:namespace,
    initialState: {
        pokemons:[],
        loading:false,
        message:"",
        pokemonInfo:pokemonInfoState
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.loading = true;
                state.pokemonInfo = pokemonInfoState,
                state.message = ""
            })
            .addCase(getPokemons.rejected, (state) => {
                state.loading = false;
                state.message = "Something went wrong!"
            })
            .addCase(getPokemons.fulfilled, (state,action) => {
                state.loading = false;
                state.pokemons = action.payload;
            })
    }
})