import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import { BsCaretLeftFill } from 'react-icons/bs'
import Spinner from '../components/Loader'
const Details = () => {
  const router = useRouter()
  const { country } = router.query
  const getCountryInfo = () =>
    fetch(`https://restcountries.com/v2/name/${country}`).then((data) =>
      data.json()
    )
  let { data, error, loading } = useSWR([`country`, country], getCountryInfo)
  const badgeBg = useColorModeValue(
    'hsl(0, 0%, 98.0392156862745%)',
    'hsl(207, 26%, 17%)'
  )
  let currencies = ''
  let languages = ''
  if (data && data.length > 0) {
    currencies = data[0].currencies.map((item) => item.name).join(',')
    languages = data[0].languages.map((item) => item.name).join(',')
  }
  return (
    <VStack alignItems="flex-start" px={[3, 5, 7, 10]} spacing="8" w="full">
      <Head>
        <title>Country | info</title>
        <meta name="title" content="Countries Finder" />
        <meta
          name="description"
          content={`Find all the  information you need about. It's as simple as that, no google need`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Countries Finder" />
        <meta
          property="og:description"
          content={`Find all the  information you need about. It's as simple as that, no google need`}
        />
        <meta property="og:image" content={data[0].flag} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Countries Finder" />
        <meta
          property="twitter:description"
          content={`Find all the  information you need about. It's as simple as that, no google need`}
        />
        <meta property="twitter:image" content={data[0].flag} />
      </Head>
      <Button
        leftIcon={<BsCaretLeftFill />}
        variant="outline"
        onClick={() => router.push('/')}
      >
        Back
      </Button>
      {data ? (
        <Stack
          direction={['column', 'column', 'row']}
          w="full"
          spacing={8}
          maxW="container.xl"
          alignSelf="center"
        >
          <Box
            w={['full', 'full', '50%']}
            h={['16rem', '18rem', '20rem']}
            flexShrink="0"
          >
            <Image
              src={data[0].flag}
              alt={data[0].name}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <VStack flex="1" alignItems="flex-start" spacing={5}>
            <Heading mb={3}>{data[0].name}</Heading>
            <Stack direction={['column', 'column', 'row']} w="full" spacing={5}>
              <Box>
                <HStack>
                  <Text>Native Name:</Text>
                  <chakra.span color="gray.500">
                    {data[0].nativeName}
                  </chakra.span>
                </HStack>
                <HStack>
                  <Text>Population:</Text>
                  <chakra.span color="gray.500">
                    {data[0].population}
                  </chakra.span>
                </HStack>
                <HStack>
                  <Text>Region:</Text>
                  <chakra.span color="gray.500">{data[0].region}</chakra.span>
                </HStack>
                <HStack>
                  <Text>Sub Region:</Text>
                  <chakra.span color="gray.500">
                    {data[0].subregion}
                  </chakra.span>
                </HStack>
                <HStack>
                  <Text>Capital:</Text>
                  <chakra.span color="gray.500">{data[0].capital}</chakra.span>
                </HStack>
              </Box>
              <Box>
                <HStack>
                  <Text>Top Level Domain:</Text>
                  <chakra.span color="gray.500">
                    {data[0].topLevelDomain.join(',')}
                  </chakra.span>
                </HStack>
                <HStack>
                  <Text>Calling Code:</Text>
                  <chakra.span color="gray.500">
                    {data[0].callingCodes.join(',')}
                  </chakra.span>
                </HStack>
                <HStack>
                  <Text>Currencies:</Text>
                  <chakra.span color="gray.500">{currencies}</chakra.span>
                </HStack>
                <HStack>
                  <Text>Languages:</Text>
                  <chakra.span color="gray.500">{languages}</chakra.span>
                </HStack>
              </Box>
            </Stack>
            {data[0].borders && (
              <HStack flexWrap="wrap" gap="2">
                <Text>Border Countries:</Text>
                {data[0].borders?.map((item, key) => (
                  <chakra.span
                    shadow="sm"
                    rounded="sm"
                    px={4}
                    py={0.5}
                    bg={badgeBg}
                    key={key}
                    fontSize="0.8rem"
                  >
                    {item}
                  </chakra.span>
                ))}
              </HStack>
            )}
          </VStack>
        </Stack>
      ) : (
        <Spinner />
      )}
    </VStack>
  )
}

export default Details
