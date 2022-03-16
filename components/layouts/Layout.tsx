import Head from "next/head"
import { useRouter } from "next/router"
import { FC } from "react"
import { Navbar } from "../ui"

interface Props {
    title?: string
}
                                                                               // El origen de este Layout se va renderizar  
const origin = (typeof window === "undefined") ? '' : window.location.origin;  // tanto en el frontend como en el backend
                                                                               // Damos un origen dinámico para poder poner  
                                                                               // la ruta de los metatags 

export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
    
        <Head>
            <title>{ title || 'PokemonApp' }</title>
            <meta name="author" content="Jisap" />
            <meta name="description" content={`Información sobre el pokemon xxxx ${ title }`} />
            <meta name="keywords" content={`${ title },pokemon, pokedex`} />
            <meta property="og:title" content={`Información sonre el ${ title })`} />
            <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
            <meta property="og:image" content={`${ origin }/img/banner.png`} />
        </Head>

        <Navbar />

        <main style={{
            padding: '0px 20px'
        }}>
            { children }
        </main>
    </>
  )
}
