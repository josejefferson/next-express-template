import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { MdDone, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import Nav from '../../components/navbar'
import { useAuth } from '../../contexts/auth'
import api from '../../utils/api'
import { getName } from '../../utils/helpers'

export default function Signup() {
  const [loggedName, setLoggedName] = useState<string>()

  return (
    <>
      <Nav title="Fazer login" />
      <Box>
        <Flex minHeight="calc(100vh - 74px)" width="full" align="center" justifyContent="center">
          <Box
            position="relative"
            bg={useColorModeValue('#d0d8dd', '#000')}
            px={4}
            width="94%"
            maxWidth="500px"
            borderRadius="lg"
            textAlign="center"
          >
            <Box p={4}>
              <Heading color={useColorModeValue('#18216d', 'white')} my={3}>
                Login
              </Heading>
              <LoginForm setLoggedName={setLoggedName} />
            </Box>

            <Center
              position="absolute"
              left="0"
              top="0"
              w="full"
              h="full"
              opacity={loggedName ? 1 : 0}
              pointerEvents={loggedName ? 'all' : 'none'}
              zIndex="2"
            >
              <Center
                className={['login-success', loggedName ? 'animate' : ''].join(' ')}
                flexDirection="column"
                color="white"
                backgroundColor="green.500"
                borderRadius="full"
                w="200px"
                h="200px"
              >
                <MdDone size={128} />
                <Box className="login-success-name" fontWeight={500} fontSize="lg" mt={3}>
                  Bem-vindo(a) {getName(loggedName) || 'Usuário'}!
                </Box>
              </Center>
            </Center>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

const LoginForm = ({ setLoggedName }: any) => {
  const toast = useToast()
  const router = useRouter()
  const { refresh } = useAuth()
  const [cookie, setCookie] = useCookies(['authorization'])
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    setLoading(true)
    setInvalid(false)

    api
      .post('/auth/login', { username, password })
      .then(({ data }) => {
        if (!data.token) throw new Error('Token não foi retornado pelo servidor')
        setCookie('authorization', data.token, {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          path: '/'
        })
        setTimeout(() => refresh(), 10)
        setLoggedName(data.name || 'Usuário')
        const redirect = (router.query.continue as string) || '/'
        setTimeout(() => (location.href = redirect), 1000)
      })
      .catch((err) => {
        if (err?.response?.data?.message === 'Usuário ou senha incorretos') return setInvalid(true)
        toast(error(err))
      })
      .finally(() => setLoading(false))
  }

  return (
    <Box my={8} textAlign="left" as="form" onSubmit={handleSubmit}>
      <FormControl id="user">
        <FormLabel color={useColorModeValue('#18216d', 'white')}>Usuário</FormLabel>
        <InputGroup>
          <InputLeftElement width="3rem" height="100%" pr={2}>
            <MdPerson />
          </InputLeftElement>
          <Input
            onChange={() => setInvalid(false)}
            name="username"
            type="text"
            placeholder="Insira o seu usuário"
            disabled={loading}
            required
            focusBorderColor="purple.500"
            rounded="lg"
            bg={useColorModeValue('white', '#000000')}
            autoCapitalize="none"
            autoComplete="username"
            autoFocus
            spellCheck={false}
          />
        </InputGroup>
      </FormControl>

      <FormControl mt={4} id="password" isInvalid={invalid}>
        <FormLabel color={useColorModeValue('#18216d', 'white')}>Senha</FormLabel>
        <InputGroup>
          <InputLeftElement width="3rem" height="100%" pr={2}>
            <MdLock />
          </InputLeftElement>
          <Input
            onChange={() => setInvalid(false)}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            disabled={loading}
            bg={useColorModeValue('white', '#000000')}
            focusBorderColor="purple.500"
            required
            rounded="lg"
          />
          <InputRightElement>
            <IconButton
              aria-label="Exibir/ocultar senha"
              size="sm"
              variant="ghost"
              colorScheme="white"
              onClick={handleClick}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>Usuário ou senha incorretos</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        width="full"
        mt={4}
        outline="none"
        _hover={{ backgroundColor: 'purple.600' }}
        backgroundColor="purple.500"
        loadingText="Entrando..."
        isLoading={loading}
      >
        Entrar
      </Button>
    </Box>
  )
}

function error(err: any) {
  return {
    title: 'Erro ao fazer login',
    description: err?.response?.data?.message || err.message,
    status: 'error' as const,
    duration: 5000,
    isClosable: true
  }
}
