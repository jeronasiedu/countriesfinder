import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Image,
  Heading,
  VStack,
  Text,
  chakra,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import Head from 'next/head'
import { BiSearch } from 'react-icons/bi'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Spinner from '../components/Loader'
export default function Home() {
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('africa')
  const router = useRouter()
  const getCountries = () =>
    fetch(`https://restcountries.com/v3.1/region/${filter}`).then((data) =>
      data.json()
    )
  const { data, loading, error } = useSWR(['countries', filter], getCountries)
  const cardBg = useColorModeValue('#fff', ' hsl(207, 26%, 17%)')
  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/search/${text}`)
  }
  const handleSelect = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }
  return (
    <Box px={6} mb={5}>
      <Head>
        <title>Countries Finder</title>
        <meta name="title" content="Countries Finder" />
        <meta
          name="description"
          content="Find all the  information you need about any country. It's as simple as that, no google need"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://countriesfinder.vercel.app" />
        <meta property="og:title" content="Countries Finder" />
        <meta
          property="og:description"
          content="Find all the  information you need about any country. It's as simple as that, no google need"
        />
        <meta
          property="og:image"
          content="https://github.com/jeronasiedu/countriesfinder/blob/main/public/screenshot1.png?raw=true"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://countriesfinder.vercel.app"
        />
        <meta property="twitter:title" content="Countries Finder" />
        <meta
          property="twitter:description"
          content="Find all the  information you need about any country. It's as simple as that, no google need"
        />
        <meta
          property="twitter:image"
          content="https://github.com/jeronasiedu/countriesfinder/blob/main/public/screenshot1.png?raw=true"
        />
      </Head>
      <Stack
        direction={['column', 'column', 'row']}
        w="full"
        wrap="wrap"
        mb={5}
      >
        <chakra.form onSubmit={handleSearch} w="full">
          <InputGroup w="full" maxW="25rem">
            <InputLeftElement pointerEvents="none">
              <BiSearch color="gray.300" size={20} />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="search for a country"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </InputGroup>
        </chakra.form>
        <Spacer />
        <Select maxW="15rem" onChange={handleSelect} value={filter}>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </Select>
      </Stack>
      {data ? (
        <SimpleGrid minChildWidth={['240px']} spacing={5}>
          {data?.map((item, idx) => (
            <Link href={`/${item.name.common}`} key={idx}>
              <a>
                <Box
                  h={['20rem', '18rem']}
                  rounded="sm"
                  shadow="md"
                  bg={cardBg}
                >
                  <Box pos="relative" w="full" h="55%">
                    <Image
                      src={item.flags.svg}
                      alt={item.name.official}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                  <VStack p={3} alignItems="flex-start" spacing="0">
                    <Heading size="md" mb="2">
                      {item.name.common}
                    </Heading>
                    <HStack>
                      <Text>Population:</Text>
                      <chakra.span color="gray.500">
                        {item.population}
                      </chakra.span>
                    </HStack>
                    <HStack>
                      <Text>Region:</Text>
                      <chakra.span color="gray.500">{item.region}</chakra.span>
                    </HStack>
                    {item.capital && (
                      <HStack>
                        <Text>Capital:</Text>
                        <chakra.span color="gray.500">
                          {item.capital}
                        </chakra.span>
                      </HStack>
                    )}
                  </VStack>
                </Box>
              </a>
            </Link>
          ))}
        </SimpleGrid>
      ) : loading ? (
        <Heading textAlign="center">Loading</Heading>
      ) : error ? (
        <Heading textAlign="center">There was an error</Heading>
      ) : (
        <Spinner />
      )}
    </Box>
  )
}
