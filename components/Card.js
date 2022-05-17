import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

const Card = ({ prompt, answer }) => {
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={7}
        maxWidth="900px"
        borderWidth={3}
        borderRadius={20}
        borderColor={useColorModeValue('black', 'yellow')}
        boxShadow="lg"
        width="full"
      >
        <h2>{prompt}</h2>
        <br />
        <h2>{answer}</h2>
      </Box>
    </Flex>
  )
}

export default Card
