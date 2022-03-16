

const toggleFavorite = ( id: number ) => {

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]'); // Definimos un [] desde localStorage

    if( favorites.includes(id)){                                    // Si favorites[] contiene el id de los argumentos
        favorites = favorites.filter( pokeId => pokeId !== id )     // favorites[] = favorites[] menos dicho id.   
    }else{ 
        favorites.push( id );                                       // Pero si no lo contiene, ese id lo insertamos 
    }

    localStorage.setItem('favorites', JSON.stringify( favorites )); // Despues lo grabamos
}

const existInFavorites = ( id: number): boolean => {

    if( typeof window === 'undefined' ) return false; // Solo se llamará existInFavorites si la función se ejecuta del lado
                                                      // del servidor. En el servidor el objeto window no existe.
    
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]'); // Recuperamos el []favorites de localStorage

    return favorites.includes( id ); // retornamos true o false según si incluye el pokemon(id) de los argumentos
}

const pokemons = (): number[] => {

    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

export default { toggleFavorite, existInFavorites, pokemons }