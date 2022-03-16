import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '../themes';

//npm i @nextui-org/react


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={ darkTheme }>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
