import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"


export const getPokemonInfo = async (nameOrId: string) => { // Recibimos el name o el id desde los params de getStaticPaths

    try {
        
        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`) // y lo usamos para obtener la data del pokemon 
    
        return {               // De la data solo usaremos el id, el name y los sprites
            id: data.id,
            name: data.name,
            sprites: data.sprites,
        }

    } catch (error) {
        return null;
    }
}