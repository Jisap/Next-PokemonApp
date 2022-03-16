import { NextPage, GetStaticProps } from 'next'
import { pokeApi } from '../api';
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import {  Grid } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemon';

interface Props{ 
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ( { pokemons } ) => {

  return (
    
      <Layout title="Listado de Pokemons">

        <Grid.Container gap={ 2 } justify='flex-start'>
          { 
            pokemons.map( ( pokemon ) => (
              <PokemonCard 
                key={ pokemon.id }
                pokemon={ pokemon }
              />
            ))
          }
        </Grid.Container>
      </Layout>
    
  )
}

// Se debe usar getStaticProps cuando:
//- Los datos necesarios para representar la página están disponibles en el momento de la compilación 
//  antes de la solicitud del usuario.
//- Los datos vienen de un CMS.
//- La data a sido cacheada en public.
//- En desarrollo se llama en cada renderizado pero en producción no, solo la 1ª vez generando todas la props necesarias.

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');  // Petición -> data

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({               // []pokemons
    ...poke, 
    id: i+1,
    img:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i+1}.svg`
  }))

  return {        // Devolvemos los pokemons[] como props
    props: {
      pokemons
    }
  }
}

export default HomePage
