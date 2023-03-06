import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../api/apiData";
const namespace = 'pokemons';
export const getPokemons = createAsyncThunk(
    `${namespace}/getPokemons`,
    async ({size,page}) => {
        return await apiData.getPokemons(size,page)
    }
)

export const getPokemonById = createAsyncThunk (
    `${namespace}/getPokemonById`,
    async (id) => {
        return await apiData.getPokemonById(id)
    }
)

const pokemonDetailInitial = {
    name:"", 
    id:"", 
    sprites: {
        front_default: ""
    }, 
    height: "",
    weight: "",
    types: []

}
export const pokemonsSlice = createSlice({
    name:namespace,
    initialState: {
        pokemons:[],
        loading:false,
        message:"",
        total:"0",
        pokemonDetailed:pokemonDetailInitial
    },
 
    extraReducers: builder => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.loading = true;
                state.message = ""
            })
            .addCase(getPokemons.rejected, (state) => {
                state.loading = false;
                state.message = "Something went wrong!"
            })
            .addCase(getPokemons.fulfilled, (state,action) => {
                state.loading = false;
                state.pokemons = action.payload.results;
                state.total = action.payload.count
            })
            .addCase(getPokemonById.pending, (state) => {
                state.loading = true;
                state.message = "";
                state.pokemonDetailed = pokemonDetailInitial
            })
            .addCase(getPokemonById.rejected, (state) => {
                state.loading = false;
                state.message = "Something went wrong!"
            })
            .addCase(getPokemonById.fulfilled, (state,action) => {
                state.loading = false;
                state.pokemonDetailed = action.payload;
            })
    }
})


export default pokemonsSlice.reducer;