import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { useEffect, useState } from 'react';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts/Layout';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti'

interface Props { 
    pokemon: Pokemon;    
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
                                               // estado inicial = true o false según este o no en favorites
    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ));  

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id ); // Evalua si está en favoritos y lo introduce en LocalEst o no según este.
        setIsInFavorites( !isInFavorites );          // Establece el estado de isInFavorites al contrario del que este

        if ( isInFavorites ) return                  // Si el pokemon está en favoritos terminamos   
            
        confetti({
            zIndex: 999,
            particleCount:100,
            spread:160,
            angle:-100,
            origin:{
                x:1,
                y:0,
            }
        })
    }  

  
  return (
    <Layout title={ pokemon.name }>
       <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
           
           <Grid xs={ 12 } sm={ 4 }>
               <Card hoverable css={{ padding: '30px' }}>
                 <Card.Body>
                     <Card.Image 
                        src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}   
                        alt={ pokemon.name }
                        width="100%"
                        height={ 200 }
                     />
                 </Card.Body>
               </Card>
           </Grid>

           <Grid xs={ 12 } sm={ 8 }>
               <Card>

                <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text h1 transform='capitalize'>{ pokemon.name }</Text>
                    <Button
                        color="gradient"
                        ghost={ !isInFavorites }
                        onClick={ onToggleFavorite }
                    >
                        { isInFavorites ? 'En favoritos' : 'Guardar en favoritos' }
                    </Button>
                </Card.Header>

                <Card.Body>
                    <Text size={ 30 }>Sprites:</Text>
                    <Container display='flex' direction='row'>
                        <Image 
                            src={ pokemon.sprites.front_default }
                            alt={ pokemon.name }
                            width={ 100 }
                            height={ 100 }
                        />
                        <Image
                            src={ pokemon.sprites.back_default }
                            alt={ pokemon.name }
                            width={100}
                            height={100}
                        />
                        <Image
                            src={ pokemon.sprites.front_shiny }
                            alt={ pokemon.name}
                            width={100}
                            height={100}
                        />
                        <Image
                            src={ pokemon.sprites.back_shiny }
                            alt={ pokemon.name }
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

// Si una página tiene Rutas Dinámicas y usa getStaticProps, 
// se necesita definir una lista de rutas que se generarán estáticamente -> (producción de una sola vez)

export const getStaticPaths: GetStaticPaths = async (ctx) => { 

    const pokemons151 = [...Array(151)].map(( value, index ) => `${ index + 1 }`); // Array con 151 ids vacio.

    return {
        paths: pokemons151.map( id => ({    // 1º obtenemos los paths que nos generan un ids 
            params:{ id }                   // Estos ids se redefinen como params que pasarán 
        })),                                // a las getStaticProps cuando sea llamados en el url
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string };    // Recibimos el id desde los params del url

    // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ id }`) // y lo usamos para obtener la data del pokemon 

    // const pokemon = {               // De la data solo usaremos el id, el name y los sprites
    //     id: data.id,
    //     name: data.name,
    //     sprites: data.sprites,
    // }

    return {
        props: {
            //pokemon: data // Esta data contiene la info que usaremos en la página

            pokemon: await getPokemonInfo( id )
        }
    }
}





export default PokemonPage
