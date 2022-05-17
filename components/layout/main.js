import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../navbar";

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Shopify Internship</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.sm" pt={20}>
        {children}
      </Container>
    </Box>
  );
};
export default Main;
