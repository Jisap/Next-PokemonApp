
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';


const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]); // Creamos un estado para los pokemons favoritos

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemons() );// Establecemos el contenido del estado desde localStorage 
  }, []);


  return (
    <Layout title='Pokemons Favoritos'>

      { 
        favoritePokemons.length === 0
          ? ( <NoFavorites /> )
          : ( <FavoritePokemons favoritePokemons={ favoritePokemons } /> )
      }

    </Layout>
  )
}

export default FavoritesPage