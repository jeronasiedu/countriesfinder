import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from '../components/Layout'
import NextNProgress from 'nextjs-progressbar'
const colors = {}
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({ colors, config })
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <NextNProgress />
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
