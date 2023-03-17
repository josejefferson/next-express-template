import { AspectRatio, Button, Center, Container, SimpleGrid, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import Nav from '../components/navbar'
import { MENU } from '../components/navbar/drawer'
import { useAuth } from '../contexts/auth'
import { getName, getTimeSaudation } from '../utils/helpers'

export default function Main() {
  const { user } = useAuth()
  const [timeSaudation, setTimeSaudation] = useState<string>()
  useEffect(() => {
    setTimeSaudation(getTimeSaudation())
  }, [])

  return (
    <>
      <Nav />
      <Container maxW="4xl" my={3}>
        <Text mt={2} mb={6} textAlign="center" fontSize="5xl" fontWeight={300}>
          {timeSaudation} {getName(user?.name)}!
        </Text>

        <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={2}>
          {MENU.map((item, i) =>
            item.forceReload ? (
              <a href={item.url} key={i}>
                <Item item={item} />
              </a>
            ) : (
              <Link href={item.url} key={i}>
                <Item item={item} />
              </Link>
            )
          )}
        </SimpleGrid>
      </Container>
    </>
  )
}

interface IItem {
  name: string
  url: string
  icon: IconType
  forceReload?: boolean
}

function Item({ item }: { item: IItem }) {
  return (
    <AspectRatio ratio={1}>
      <Button colorScheme="gray">
        <Center flexDirection="column">
          {<item.icon size={56} />}
          <Text fontWeight={500} mt={2}>
            {item.name}
          </Text>
        </Center>
      </Button>
    </AspectRatio>
  )
}
