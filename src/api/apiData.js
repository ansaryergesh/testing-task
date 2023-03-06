import { instance } from "./instances";

class ApiData {
    getPokemons = async (size,page) =>{
        const offset = size*page;
        console.log(page)
        try {
            const response = await instance.get(`/pokemon?offset=${offset}&limit=${size}`)
            return response.data;
        } catch (err) {
            console.log(err)
        }
    }

    getPokemonById = async(id) => {
        try {
            const response = await instance.get(`/pokemon/${id}`)
            return response.data;
        } catch(err) {
            console.log(err);
        }
    }
}

export const apiData = new ApiData()