import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  chakra,
  Button,
  Image,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import { BsCaretLeftFill, BsHouse } from 'react-icons/bs'
import Spinner from '../../components/Loader'
import Link from 'next/link'
const Search = () => {
  const router = useRouter()
  const { searchterm } = router.query
  const getCountryInfo = () =>
    fetch(`https://restcountries.com/v3.1/name/${searchterm}`).then((data) =>
      data.json()
    )
  let { data, error, loading } = useSWR(searchterm, getCountryInfo)
  const cardBg = useColorModeValue('#fff', ' hsl(207, 26%, 17%)')
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return (
      <Heading size="md" textAlign="center">
        Make sure you are connected to the internet and try again
      </Heading>
    )
  }

  return (
    <VStack
      alignItems="flex-start"
      px={[3, 5, 7, 10]}
      spacing="8"
      w="full"
      mb={5}
    >
      <Head>
        <title>Country info</title>
        <meta name="title" content="Countries Finder" />
        <meta
          name="description"
          content={`Find all the  information you need about. It's as simple as that, no google need`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://countriesfinder.vercel.app" />
        <meta property="og:title" content="Countries Finder" />
        <meta
          property="og:description"
          content={`Find all the  information you need about. It's as simple as that, no google need`}
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
          content={`Find all the  information you need about. It's as simple as that, no google need`}
        />
        <meta
          property="twitter:image"
          content="https://github.com/jeronasiedu/countriesfinder/blob/main/public/screenshot1.png?raw=true"
        />
      </Head>
      {data && data.length > 0 && (
        <Button
          leftIcon={<BsCaretLeftFill />}
          variant="outline"
          onClick={() => router.push('/')}
        >
          Back
        </Button>
      )}
      {data ? (
        <SimpleGrid minChildWidth={['240px']} spacing={5} w="full">
          {data.length > 0 ? (
            data.map((item, idx) => (
              <Link href={`/${item.name.common}`} key={idx}>
                <a>
                  <Box
                    h={['21rem', '20rem']}
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
                        <chakra.span color="gray.500">
                          {item.region}
                        </chakra.span>
                      </HStack>
                      <HStack>
                        <Text>Sub Region:</Text>
                        <chakra.span color="gray.500">
                          {item.subregion}
                        </chakra.span>
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
            ))
          ) : (
            <>
              <VStack spacing={5}>
                <Heading size="md" textAlign="center">
                  Sorry, we couldn&apos;t find your search
                </Heading>
                <Button
                  leftIcon={<BsHouse />}
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  Home
                </Button>
              </VStack>
            </>
          )}
        </SimpleGrid>
      ) : (
        <Spinner />
      )}
    </VStack>
  )
}

export default Search
