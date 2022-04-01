import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from '../components/Layout'
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
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
