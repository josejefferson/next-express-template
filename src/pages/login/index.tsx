import SignIn from '#components/login/signin'
import Nav from '#components/navbar'
import { Card, Flex, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

export default function Login() {
  const router = useRouter()
  const toast = useToast()
  const [cookie, setCookie] = useCookies(['authorization'])

  const handleSuccess = (data: any) => {
    if (!data.token) throw new Error('Token não foi retornado pelo servidor')
    setCookie('authorization', data.token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: '/'
    })
    const redirect = (router.query.continue as string) || '/'
    setTimeout(() => (location.href = redirect), 1000)
  }

  const handleError = (err: any) => {
    toast({
      title: 'Erro',
      description: err?.response?.data?.message || err.message,
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  return (
    <>
      <Nav title="Fazer login" />
      <Flex minH="calc(100vh - 64px)" alignItems="center" justifyContent="center" p={2}>
        <Card
          m="auto"
          w="full"
          maxWidth="500px"
          flexDirection="column"
          variant="filled"
          alignItems="center"
          p={[5, 10]}
          py={[7, 10]}
          borderRadius={13}
          textAlign="center"
        >
          <SignIn handleSuccess={handleSuccess} handleError={handleError} />
        </Card>
      </Flex>
    </>
  )
}
