import { Button, useColorModeValue } from '@chakra-ui/react'
import { AiFillRobot } from 'react-icons/ai'

const SubmitButton = () => {
  return (
    <Button
      leftIcon={<AiFillRobot />}
      colorScheme={useColorModeValue('purple', 'yellow')}
      variant="solid"
      width="full"
      mt={4}
      type="submit"
    >
      {' '}
      Engage AI{' '}
    </Button>
  )
}
export default SubmitButton
