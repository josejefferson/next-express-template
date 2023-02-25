import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { MdHome } from 'react-icons/md'
import Nav from '../components/navbar'

export default function Error404() {
  return (
    <>
      <Nav title="404 Not Found" hideMenuButton hideUser />

      <Flex
        minHeight="calc(100vh - 74px)"
        width="full"
        align="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading mb={3}>404 Not Found</Heading>
        <Text mb={3}>Ops! Esta página não foi encontrada!</Text>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">
          <Button variant="outline" leftIcon={<MdHome />}>
            Voltar à página inicial
          </Button>
        </a>
      </Flex>
    </>
  )
}
