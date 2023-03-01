import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdHome, MdRefresh } from 'react-icons/md'
import Nav from '../components/navbar'

export default function Error500() {
  const router = useRouter()
  const title = router.query.t as string
  const desc = router.query.d

  return (
    <>
      <Nav title={title || '500 Internal Server Error'} hideMenuButton hideUser />

      <Flex
        minHeight="calc(100vh - 74px)"
        width="full"
        align="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading mb={3}>{title || '500 Internal Server Error'}</Heading>
        <Text mb={3}>{desc || 'Ops! Ocorreu um erro ao exibir esta página!'}</Text>

        <Button
          mb={2}
          variant="outline"
          leftIcon={<MdRefresh />}
          colorScheme="orange"
          onClick={() => router.reload()}
        >
          Tentar novamente
        </Button>

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
