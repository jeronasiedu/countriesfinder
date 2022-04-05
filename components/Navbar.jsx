import {
  HStack,
  IconButton,
  Spacer,
  Heading,
  useColorMode,
} from '@chakra-ui/react'
import { BiSun, BiMoon } from 'react-icons/bi'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const icon = colorMode === 'light' ? <BiMoon /> : <BiSun />
  const bg = colorMode === 'light' ? '#fff' : 'hsl(207, 26%, 17%)'
  return (
    <HStack bg={bg} py={3} px={[4, 6, 10]} shadow="md" as="nav" mb={8}>
      <Heading size="md" onClick={() => router.push('/')} cursor="pointer">
        Where in the world?
      </Heading>
      <Spacer />
      <IconButton icon={icon} onClick={toggleColorMode} />
    </HStack>
  )
}

export default Navbar
