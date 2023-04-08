import PasswordInput from '#components/common/password-input'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps, useColorModeValue
} from '@chakra-ui/react'
import { MdPerson } from 'react-icons/md'

interface IProps extends InputProps {
  loading: boolean
}

export function Username({ loading, ...props }: IProps) {
  return (
    <FormControl mt={3} px={1} isRequired isDisabled={loading}>
      <FormLabel>Usuário</FormLabel>
      <InputGroup>
        <InputLeftElement width="3rem" height="full" pr={2}>
          <MdPerson />
        </InputLeftElement>
        <Input
          name="username"
          placeholder="Insira o seu usuário"
          autoCapitalize="none"
          spellCheck={false}
          bg={useColorModeValue('white', 'transparent')}
          {...props}
        />
      </InputGroup>
    </FormControl>
  )
}

interface IPasswordProps {
  invalid: boolean
  setInvalid: (invalid: boolean) => any
}

export function Password({ loading, invalid, setInvalid, ...props }: IProps & IPasswordProps) {
  return (
    <FormControl mt={3} px={1} isRequired isDisabled={loading} isInvalid={invalid}>
      <FormLabel>Senha</FormLabel>
      <PasswordInput
        name="password"
        placeholder="Insira sua senha"
        bg={useColorModeValue('white', 'transparent')}
        onChange={() => invalid && setInvalid(false)}
        {...props}
      />
      <FormErrorMessage>Usuário ou senha incorretos</FormErrorMessage>
    </FormControl>
  )
}
