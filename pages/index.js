import React from 'react'
import AiForm from '../components/Form'
import Section from '../components/section'
import { Container, Box, Heading, Image } from '@chakra-ui/react'

function Home() {
  return (
    <Container>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Fun with AI
          </Heading>
          <Heading as="h1" variant="page-title">
            {' '}
            This Form &gt; Google
          </Heading>
          <p> Hover on the logo for an animation </p>
        </Box>

        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          align="center"
        >
          <Image maxWidth="70px" src="/images/loai.png" alt="Profile Picture" />
        </Box>
      </Box>
      <br />
      <br />
      <Section delay={0.4}>
        <AiForm />
      </Section>
    </Container>
  )
}

export default Home
