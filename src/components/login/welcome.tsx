import { getName } from '#utils/helpers'
import { Avatar, Heading, Spinner, Text } from '@chakra-ui/react'

export function WelcomeBack({ user }: any) {
  return (
    <>
      <Avatar mt={6} size="2xl" bg="blue.400" src={user?.photo} />
      <Heading my={5} fontSize="3xl">
        {user?.nickname || getName(user?.name)}
      </Heading>
      <Text mt={6} mb={4} fontSize="xl" fontWeight="300">
        Bem-vindo de volta!
      </Text>
      <Spinner />
    </>
  )
}

export function Welcome({ user }: any) {
  return (
    <>
      <Avatar mt={6} size="2xl" bg="blue.400" src={user?.photo} />
      <Heading my={5} fontSize="3xl">
        {user?.nickname || getName(user?.name)}
      </Heading>
      <Text mt={6} mb={4} fontSize="xl" fontWeight="300">
        Bem-vindo!
      </Text>
      <Spinner />
    </>
  )
}
