import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import ThemeToggle from './theme-toggle'
import { IoLogoGithub } from 'react-icons/io'
import { Button } from '@chakra-ui/react'

const LinkItem = ({ href, children, target, path }) => {
  const isActive = path === href
  const notActiveColor = useColorModeValue('gray200', 'whiteAlpha900')
  return (
    <NextLink href={href}>
      <Link
        p={2}
        bg={isActive ? 'glassTeal' : undefined}
        color={isActive ? '#202023' : notActiveColor}
        target={target}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = (props) => {
  const { path } = props

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      zIndex={1}
      css={{ backdropFilter: 'blur(10px)' }}
      {...props}
    >
      <Container display="flex" p={2} maxW="container.md">
        <Flex mr={5}>
          <Heading as="h1" size={'md'} letterSpacing={'tight'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          p="1"
          alignItems="center"
        >
          <Link
            href="https://github.com/loayei/Shopify-Internship-Frontend"
            passhref="true"
          >
            <Button>
              <IoLogoGithub />
              Github
            </Button>
          </Link>
        </Stack>

        <Box flex={1} align="right">
          <ThemeToggle />
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
