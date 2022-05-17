import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layout/main'
import Fonts from '../components/fonts'
import theme from '../libraries/theme'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ChakraProvider>
  )
}
export default MyApp
