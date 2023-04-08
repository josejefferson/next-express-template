import { Button } from '@chakra-ui/react'

interface IProps {
  loading: boolean
}

export function SignInButton({ loading }: IProps) {
  return (
    <Button
      type="submit"
      w="50%"
      mt={5}
      loadingText="Entrando..."
      borderRadius="full"
      isLoading={loading}
      disabled={loading}
    >
      Entrar
    </Button>
  )
}
