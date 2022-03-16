import React, { useState } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import confetti from 'canvas-confetti';
import { getPokemonInfo, localFavorites } from '../../utils';


interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id); // Evalua si está en favoritos y lo introduce en LocalEst o no según este.
        setIsInFavorites(!isInFavorites);          // Establece el estado de isInFavorites al contrario del que este

        if (isInFavorites) return                  // Si el pokemon está en favoritos terminamos   

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })
    }  

  return (
      <Layout title={pokemon.name}>
          <Grid.Container css={{ marginTop: '5px' }} gap={2}>

              <Grid xs={12} sm={4}>
                  <Card hoverable css={{ padding: '30px' }}>
                      <Card.Body>
                          <Card.Image
                              src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                              alt={pokemon.name}
                              width="100%"
                              height={200}
                          />
                      </Card.Body>
                  </Card>
              </Grid>

              <Grid xs={12} sm={8}>
                  <Card>

                      <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text h1 transform='capitalize'>{pokemon.name}</Text>
                          <Button
                              color="gradient"
                              ghost={!isInFavorites}
                              onClick={onToggleFavorite}
                          >
                              {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
                          </Button>
                      </Card.Header>

                      <Card.Body>
                          <Text size={30}>Sprites:</Text>
                          <Container display='flex' direction='row'>
                              <Image
                                  src={pokemon.sprites.front_default}
                                  alt={pokemon.name}
                                  width={100}
                                  height={100}
                              />
                              <Image
                                  src={pokemon.sprites.back_default}
                                  alt={pokemon.name}
                                  width={100}
                                  height={100}
                              />
                              <Image
                                  src={pokemon.sprites.front_shiny}
                                  alt={pokemon.name}
                                  width={100}
                                  height={100}
                              />
                              <Image
                                  src={pokemon.sprites.back_shiny}
                                  alt={pokemon.name}
                                  width={100}
                                  height={100}
                              />
                          </Container>
                      </Card.Body>

                  </Card>
              </Grid>

          </Grid.Container>
      </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151'); // Petición para obtener los 151 pokemons
    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name );// Obtenemos un [] con los nombres 
    
    return {
        paths: pokemonNames.map(name => ({     // 1º obtenemos los paths que nos generan unos names
            params: { name }                   // Este names se redefinen como params que pasarán 
        })),                                   // a las getStaticProps cuando sea llamado en el url
        fallback: false                         
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };    // Recibimos el name desde los params del url

    //const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`) // y lo usamos para obtener la data del pokemon 

    // const pokemon = {               // De la data solo usaremos el id, el name y los sprites
    //     id: data.id,
    //     name: data.name,
    //     sprites: data.sprites,
    // }

    return {
        props: {
            //pokemon: data // Esta data contiene la info que usaremos en la página
        
            pokemon: await getPokemonInfo( name )
        }
    }
}

export default PokemonByNamePage

