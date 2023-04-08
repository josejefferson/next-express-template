import { SignInButton } from '#components/login/buttons'
import { Password, Username } from '#components/login/form-controls'
import { WelcomeBack } from '#components/login/welcome'
import api from '#utils/api'
import { Box, chakra, Collapse, Heading } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'

export default function SignIn({ handleSuccess, handleError }: any) {
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as any

    const username = form?.username?.value
    const password = form?.password?.value
    setLoading(true)

    api
      .post('/auth/login', { username, password })
      .then(({ data }) => {
        setUser(data)
        handleSuccess(data)
      })
      .catch((err) => {
        if (err?.response?.data?.message === 'Usuário ou senha incorretos') return setInvalid(true)
        handleError(err)
      })
      .finally(() => setLoading(false))
  }

  return (
    <chakra.form onSubmit={handleSubmit} w="full">
      <Box as={Collapse} in={!user} animateOpacity w="full">
        <Heading mb={5} fontSize="3xl">
          Bem-vindo de volta!
        </Heading>

        <Username loading={loading} autoFocus />
        <Password loading={loading} invalid={invalid} setInvalid={setInvalid} />

        <SignInButton loading={loading} />
      </Box>

      <Box as={Collapse} in={user} animateOpacity w="full" unmountOnExit>
        <WelcomeBack user={user} />
      </Box>
    </chakra.form>
  )
}
